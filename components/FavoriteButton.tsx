"use client";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableItem = favoriteProduct.find((item) => item?._id === product?._id);
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Produit retiré avec succès!"
            : "Produit ajouté aux favoris avec succès!",
        );
      });
    }
  };
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="hover:text-shop_light_green hoverEffect h-5 w-5" />
          <span className="bg-shop_dark_green absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className="group hover:text-shop_light_green hoverEffect border-shop_light_green/80 hover:border-shop_light_green relative rounded-sm border p-1.5"
        >
          {existingProduct ? (
            <Heart
              fill="#3b9c3c"
              className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 h-5 w-5"
            />
          ) : (
            <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-.5 h-5 w-5" />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
