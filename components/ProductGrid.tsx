"use client";

import { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoproductAvailable from "./NoproductAvailable";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";
const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.value ?? "");

  useEffect(() => {
    const query = `*[_type == "product" && variant == $variant] | order(name asc){
      ...,
      "categories": categories[]->title
    }`;
    const params = { variant: selectedTab };

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        console.log(response, "response");
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {loading ? (
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-10">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Produits en chargement...</span>
          </div>
        </div>
      ) : products.length ? (
        <div className="mt-10 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div>
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoproductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
