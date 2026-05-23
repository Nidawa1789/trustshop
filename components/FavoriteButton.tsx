"use client";

import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  showProduct?: boolean;
  product?: Product;
}

const FavoriteButton = ({ showProduct, product }: Props) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const existingProduct = product
    ? favoriteProduct.find((item) => item?._id === product?._id)
    : null;

  const handleFavorite = () => {
    if (!product?._id) return;

    addToFavorite(product).then(() => {
      toast.success(existingProduct ? "Produit retiré des favoris" : "Produit ajouté aux favoris");
    });
  };

  if (showProduct) {
    return (
      <button
        type="button"
        onClick={handleFavorite}
        className={`hover:bg-shop_dark_green/80 hoverEffect rounded-full p-3 hover:text-white ${
          existingProduct ? "bg-shop_dark_green/80 text-white" : "bg-lightColor/10"
        }`}
        aria-label={existingProduct ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart size={18} />
      </button>
    );
  }

  return (
    <Link href={`/cart`} className="group relative">
      <Heart className="text-shop_light_green hoverEffect h-5 w-5" />
      <span className="bg-shop_dark_green absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
        {favoriteProduct.length}
      </span>
    </Link>
  );
};

export default FavoriteButton;
