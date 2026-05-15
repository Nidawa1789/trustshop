"use client";

import { Product } from "@/sanity.types";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();

  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);

      toast.success(`${product?.name?.substring(0, 12)}... ajouté avec succès !`);
    } else {
      toast.error("Impossible d’ajouter plus que le stock disponible");
    }
  };

  return (
    <div className="flex h-12 w-full items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-darkColor/80 text-xs">Quantité</span>

            <QuantityButtons product={product} />
          </div>

          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Sous-total</span>

            <PriceFormatter amount={product?.price ? product?.price * itemCount : 0} />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "bg-shop_dark_green/80 text-lightBg border-shop_dark_green/80 hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect w-full border font-semibold tracking-wide text-white shadow-none",
            className,
          )}
        >
          <ShoppingBag />
          {isOutOfStock ? "Rupture de stock" : "Ajouter au panier"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
