import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/queries";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const SingleProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col gap-10 py-10 md:flex-row">
      {product?.images && <ImageView images={product?.images} isStock={product?.stock} />}

      <div className="flex w-full flex-col gap-5 md:w-1/2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-sm tracking-wide text-gray-600">{product?.description}</p>

          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon key={index} size={12} className="text-shop_light_green" fill={"#3b9c3c"} />
            ))}
            <p className="font-semibold">(120 avis)</p>
          </div>
        </div>

        <div className="space-y-2 border-t border-b border-gray-200 py-5">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold"
          />

          <p
            className={`inline-block rounded-lg px-4 py-1.5 text-center text-sm font-semibold ${
              product?.stock === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
            }`}
          >
            {(product?.stock as number) > 0 ? "Disponible maintenant" : "Produit indisponible"}
          </p>
        </div>

        <div className="flex items-center gap-2.5 lg:gap-3">
          <AddToCartButton product={product} />
          <FavoriteButton showProduct={true} product={product} />
        </div>

        <ProductCharacteristics product={product} />

        <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <RxBorderSplit className="text-lg" />
            <p>Comparer</p>
          </div>

          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <FaRegQuestionCircle className="text-lg" />
            <p>Poser une question</p>
          </div>

          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <TbTruckDelivery className="text-lg" />
            <p>Livraison & Retours</p>
          </div>

          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <FiShare2 className="text-lg" />
            <p>Partager</p>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Livraison */}
          <div className="border-lightColor/25 flex items-center gap-2.5 border border-b-0 p-3">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">Livraison rapide à Bamako 🚚</p>
              <p className="text-sm text-gray-500">
                Livraison sous 24h - Paiement à la livraison disponible.
              </p>
            </div>
          </div>

          {/* Retour */}
          <div className="border-lightColor/25 flex items-center gap-2.5 border p-3">
            <CornerDownLeft size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">Retour facile</p>
              <p className="text-sm text-gray-500">
                Retour possible sous 7 jours en cas de problème.{" "}
                <span className="underline underline-offset-2">Voir conditions</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
