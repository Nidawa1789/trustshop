import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  return (
    <Link href={`/cart`} className="group relative">
      <ShoppingBag className="text-shop_light_green hoverEffect h-5 w-5" />
      <span className="bg-shop_dark_green absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
        0
      </span>
    </Link>
  );
};

export default CartIcon;
