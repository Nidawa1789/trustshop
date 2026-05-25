"use client";

import { Brand, Category } from "@/sanity.types";
import type { ProductForCard } from "@/types/product";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import Container from "@/components/Container";
import Title from "@/components/Title";
import CategoryList from "@/components/shop/CategoryList";
import { useSearchParams } from "next/navigation";
import BrandList from "@/components/shop/BrandList";
import PriceList from "@/components/PriceList";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "@/components/NoproductAvailable";
import ProductCard from "@/components/ProductCard";

type ShopFiltersResponse = {
  categories?: Category[];
  brands?: Brand[];
};

const ShopContent = () => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<ProductForCard[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParams || null);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParams || null);

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    await Promise.resolve();
    setLoading(true);

    try {
      let minPrice = 0;
      let maxPrice = 10000;

      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }

      const params = new URLSearchParams();

      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedBrand) params.set("brand", selectedBrand);
      if (selectedPrice) params.set("price", `${minPrice}-${maxPrice}`);

      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Error fetching products");
      }

      const data = (await response.json()) as ProductForCard[];
      setProducts(data);
    } catch (error) {
      console.log("Erreur lors du chargement des produits", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, selectedPrice]);

  const fetchFilters = useCallback(async () => {
    try {
      const response = await fetch("/api/shop-filters");

      if (!response.ok) {
        throw new Error("Error fetching shop filters");
      }

      const { categories: categoriesData, brands: brandsData } =
        (await response.json()) as ShopFiltersResponse;

      setCategories(categoriesData ?? []);
      setBrands(brandsData ?? []);
    } catch (error) {
      console.log("Erreur lors du chargement des filtres", error);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchProducts();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchProducts]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchFilters();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchFilters]);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg tracking-wide uppercase">
              Trouvez les produits selon vos besoins
            </Title>

            {(selectedCategory !== null || selectedBrand !== null || selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green hover:text-darkRed hoverEffect mt-2 text-sm font-medium underline"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        <div className="border-t-shop_dark_green/50 flex flex-col gap-5 border-t md:flex-row">
          <div className="border-r-shop_btn_dark_green/50 scrollbar-hide pb-5 md:sticky md:top-20 md:h-[calc(100vh-160px)] md:min-w-64 md:self-start md:overflow-y-auto md:border-r">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <BrandList
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />

            <PriceList setSelectedPrice={setSelectedPrice} selectedPrice={selectedPrice} />
          </div>

          <div className="flex-1 pt-5">
            <div className="scrollbar-hide h-[calc(100vh-160px)] overflow-y-auto pr-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-2 bg-white p-20">
                  <Loader2 className="text-shop_dark_green h-10 w-10 animate-spin" />

                  <p className="text-base font-semibold tracking-wide">
                    Chargement des produits...
                  </p>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="mt-0 bg-white" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Shop = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-80 items-center justify-center">
          <Loader2 className="text-shop_dark_green h-10 w-10 animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
};

export default Shop;
