"use client";

import useStore from "@/store";
import { useState } from "react";
import Container from "./Container";
import { Heart, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(7);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Voulez-vous vraiment réinitialiser votre liste de favoris?",
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Liste de favoris réinitialisée avec succès");
    }
  };

  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-black/5">
                  <th className="p-2 text-left">Image</th>
                  <th className="hidden p-2 text-left md:table-cell">Catégorie</th>
                  <th className="hidden p-2 text-left md:table-cell">Type</th>
                  <th className="hidden p-2 text-left md:table-cell">Statut</th>
                  <th className="p-2 text-left">Prix</th>
                  <th className="p-2 text-center md:text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProduct?.slice(0, visibleProducts)?.map((product: Product) => (
                  <tr key={product?._id} className="border-b">
                    <td className="flex items-center gap-2 px-2 py-4">
                      <X
                        onClick={() => {
                          removeFromFavorite(product?._id);
                          toast.success("Produit retiré de la liste de favoris");
                        }}
                        size={18}
                        className="hoverEffect hover:cursor-pointer hover:text-red-600"
                      />
                      {product?.images && (
                        <Link
                          href={`/product/${product?.slug?.current}`}
                          className="group hidden rounded-md border md:inline-flex"
                        >
                          <Image
                            src={urlFor(product?.images[0]).url()}
                            alt={"product image"}
                            width={80}
                            height={80}
                            className="hoverEffect h-20 w-20 rounded-md object-contain group-hover:scale-105"
                          />
                        </Link>
                      )}
                      <p className="line-clamp-1">{product?.name}</p>
                    </td>
                    <td className="hidden p-2 capitalize md:table-cell">
                      {product?.categories && (
                        <p className="line-clamp-1 text-xs font-medium uppercase">
                          {product.categories.map((cat) => cat).join(", ")}
                        </p>
                      )}
                    </td>
                    <td className="hidden p-2 capitalize md:table-cell">{product?.variant}</td>
                    <td
                      className={`w-24 p-2 ${
                        (product?.stock as number) > 0 ? "text-green-600" : "text-red-600"
                      } hidden text-sm font-medium md:table-cell`}
                    >
                      {(product?.stock as number) > 0 ? "En Stock" : "En rupture de stock"}
                    </td>
                    <td className="p-2">
                      <PriceFormatter amount={product?.price} />
                    </td>
                    <td className="p-2">
                      <AddToCartButton product={product} className="w-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4 flex items-center gap-2">
            {visibleProducts < favoriteProduct?.length && (
              <div className="my-5">
                <Button variant="outline" onClick={loadMore}>
                  Charger plus
                </Button>
              </div>
            )}
            {visibleProducts > 10 && (
              <div className="my-5">
                <Button onClick={() => setVisibleProducts(10)} variant="outline">
                  Charger moins
                </Button>
              </div>
            )}
          </div>
          {favoriteProduct?.length > 0 && (
            <Button
              onClick={handleResetWishlist}
              className="mb-5 font-semibold"
              variant="destructive"
              size="lg"
            >
              Réinitialiser la liste de favoris
            </Button>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="relative mb-4">
            <div className="bg-muted-foreground/20 absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full" />
            <Heart className="text-muted-foreground h-12 w-12" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Votre liste de favoris est vide
            </h2>
            <p className="text-muted-foreground text-sm">
              Les produits ajoutés à votre liste de favoris apparaîtront ici
            </p>
          </div>
          <Link href="/shop" className={buttonVariants()}>
            Continuer les achats
          </Link>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;
