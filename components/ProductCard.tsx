import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";
import ProductSideMenu from "./ProductSideMenu";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const firstImage = product.images?.find((img) => img?.asset);

  return (
    <div className="border-darkBlue/20 group rounded-md border-[1px] bg-white text-sm">
      <div className="group bg-shop_light_bg relative overflow-hidden">
        {firstImage && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(firstImage).url()}
              alt={product?.name ? `Visuel — ${product.name}` : "Image produit"}
              width={500}
              height={500}
              priority
              className={`bg-shop_light_bg h-64 w-full overflow-hidden object-contain transition-transform duration-500 ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <ProductSideMenu product={product} />

        {product?.status === "sale" ? (
          <p className="border-darkColor/50 group-hover:border-lightGreen hover:text-shop_dark_green hoverEffect absolute top-2 left-2 z-10 rounded-full border px-2 text-xs">
            Promotion !
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="border-shop_orange/50 group-hover:border-shop_orange hover:text-shop_dark_green hoverEffect absolute top-2 left-2 z-10 rounded-full border p-1"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3">
        {product?.categories && (
          <p className="text-lightText line-clamp-1 text-xs font-medium uppercase">
            {product.categories.map((cat) => cat).join(", ")}
          </p>
        )}

        <Title className="line-clamp-1 text-sm">{product?.name}</Title>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={index < 4 ? "text-shop_light_green" : "text-lightText"}
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>

          <p className="text-lightText text-xs tracking-wide">5 avis</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">En stock</p>

          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop_dark_green/80 font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "Indisponible"}
          </p>
        </div>

        <PriceView price={product?.price} discount={product?.discount} className="text-sm" />

        <AddToCartButton product={product} className="w-40 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
