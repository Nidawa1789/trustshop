import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Répertoire du dépôt (évite que Turbopack prenne un lockfile parent comme racine). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
