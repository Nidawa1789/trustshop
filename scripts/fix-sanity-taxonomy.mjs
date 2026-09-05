#!/usr/bin/env node
/**
 * Rattache les produits aux bonnes categories et marques dans Sanity.
 *
 *   node scripts/fix-sanity-taxonomy.mjs            # dry-run : affiche le diff, n'ecrit rien
 *   node scripts/fix-sanity-taxonomy.mjs --apply    # applique les mutations
 *
 * Necessite SANITY_API_WRITE_TOKEN (token "Editor" cree sur sanity.io/manage)
 * dans .env, en plus de NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// --- Plan a appliquer : slug produit -> etat cible (slugs de categorie / marque).
// Modifier ce tableau suffit ; le script ne touche que les champs listes ici.
const PLAN = {
  "iphone-15-pro": { categories: ["smartphones"] },
  "iphone-16": { categories: ["smartphones"] },
  "air-pod": { categories: ["smartphones"] },
  television: { categories: ["televiseurs"], brand: "samsung-limited" },
  refrigerateur: { categories: ["refrigerateurs"], brand: "lg-limited" },
  // "casquette" : aucune categorie existante ne correspond, laisse tel quel.
};

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const APPLY = process.argv.includes("--apply");

function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(path.join(projectRoot, ".env"), "utf8").split("\n")) {
      const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
      if (match && !env[match[1]]) env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  } catch {
    // .env absent : on se rabat sur l'environnement du shell.
  }
  return env;
}

const env = loadEnv();
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-05";
const token = env.SANITY_API_WRITE_TOKEN;

if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID manquant");
if (APPLY && !token) throw new Error("SANITY_API_WRITE_TOKEN manquant (token Editor requis pour --apply)");

const base = `https://${projectId}.api.sanity.io/v${apiVersion}/data`;
const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

async function query(groq) {
  const url = `${base}/query/${dataset}?query=${encodeURIComponent(groq)}`;
  const response = await fetch(url, { headers: authHeaders });
  if (!response.ok) throw new Error(`GROQ ${response.status}: ${await response.text()}`);
  return (await response.json()).result;
}

const [categories, brands, products] = await Promise.all([
  query(`*[_type=="category"]{_id,title,"slug":slug.current}`),
  query(`*[_type=="brand"]{_id,title,"slug":slug.current}`),
  query(
    `*[_type=="product"]{_id,name,"slug":slug.current,"brand":brand->slug.current,"categories":categories[]->slug.current}`,
  ),
]);

const bySlug = (list) => new Map(list.map((item) => [item.slug, item]));
const categoryBySlug = bySlug(categories);
const brandBySlug = bySlug(brands);
const productBySlug = bySlug(products);

const mutations = [];
const skipped = [];

for (const [productSlug, target] of Object.entries(PLAN)) {
  const product = productBySlug.get(productSlug);
  if (!product) {
    skipped.push(`produit "${productSlug}" introuvable dans Sanity`);
    continue;
  }

  const set = {};

  if (target.categories) {
    const missing = target.categories.filter((slug) => !categoryBySlug.has(slug));
    if (missing.length > 0) {
      skipped.push(`${productSlug} : categorie(s) inexistante(s) ${missing.join(", ")}`);
    } else {
      const current = product.categories ?? [];
      const changed =
        current.length !== target.categories.length ||
        target.categories.some((slug, index) => current[index] !== slug);
      if (changed) {
        set.categories = target.categories.map((slug) => ({
          _type: "reference",
          _key: `cat-${slug}`,
          _ref: categoryBySlug.get(slug)._id,
        }));
        console.log(`  ${product.name}: categories [${current.join(", ") || "aucune"}] -> [${target.categories.join(", ")}]`);
      }
    }
  }

  if (target.brand) {
    if (!brandBySlug.has(target.brand)) {
      skipped.push(`${productSlug} : marque inexistante ${target.brand}`);
    } else if (product.brand !== target.brand) {
      set.brand = { _type: "reference", _ref: brandBySlug.get(target.brand)._id };
      console.log(`  ${product.name}: marque ${product.brand ?? "aucune"} -> ${target.brand}`);
    }
  }

  if (Object.keys(set).length > 0) {
    mutations.push({ patch: { id: product._id, set } });
  }
}

for (const warning of skipped) console.warn(`  ! ${warning}`);

if (mutations.length === 0) {
  console.log("\nRien a modifier.");
  process.exit(0);
}

if (!APPLY) {
  console.log(`\n${mutations.length} document(s) a patcher. Relancer avec --apply pour ecrire.`);
  process.exit(0);
}

const response = await fetch(`${base}/mutate/${dataset}?returnIds=true`, {
  method: "POST",
  headers: { ...authHeaders, "Content-Type": "application/json" },
  body: JSON.stringify({ mutations }),
});
if (!response.ok) throw new Error(`Mutation ${response.status}: ${await response.text()}`);

const { results } = await response.json();
console.log(`\n${results.length} document(s) mis a jour.`);
