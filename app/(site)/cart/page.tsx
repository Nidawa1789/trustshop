"use client";

import { createCheckoutSession, Metadata } from "@/app/actions/CreateCheckoutSession";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import NoAccess from "@/components/NoAccess";
import PriceFormatter from "@/components/PriceFormatter";
import ProductSideMenu from "@/components/ProductSideMenu";
import QuantityButtons from "@/components/QuantityButtons";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Address } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } =
    useStore();
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const query = `*[_type=="address"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setAddresses(data);
      const defaultAddress = data.find((addr: Address) => addr.default);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.log("Erreur lors de la récupération des adresses :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchAddresses();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleResetCart = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir réinitialiser votre panier ?");
    if (confirmed) {
      resetCart();
      toast.success("Panier réinitialisé avec succès !");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Inconnu",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Inconnu",
        clerkUserId: user?.id,
        address: selectedAddress,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Erreur lors de la création de la session de paiement :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="text-darkColor" />
                <Title>Panier</Title>
              </div>

              <div className="grid md:gap-8 lg:grid-cols-3">
                <div className="rounded-lg lg:col-span-2">
                  <div className="rounded-md border bg-white">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="flex items-center justify-between gap-5 border-b p-2.5 last:border-b-0"
                        >
                          <div className="flex h-36 flex-1 items-start gap-2 md:h-44">
                            {product?.images && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1"
                              >
                                <Image
                                  src={urlFor(product?.images[0]).url()}
                                  alt="imageProduit"
                                  width={500}
                                  height={500}
                                  loading="lazy"
                                  className="hoverEffect h-32 w-32 object-cover group-hover:scale-105 md:h-40 md:w-40"
                                />
                              </Link>
                            )}

                            <div className="flex h-full flex-1 flex-col justify-between py-1">
                              <div className="flex flex-col gap-0.5 md:gap-1.5">
                                <h2 className="line-clamp-1 text-base font-semibold">
                                  {product?.name}
                                </h2>
                                <p className="text-sm capitalize">
                                  Variante :{" "}
                                  <span className="font-semibold">{product?.variant}</span>
                                </p>
                                <p className="text-sm capitalize">
                                  Statut : <span className="font-semibold">{product?.status}</span>
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <ProductSideMenu
                                        product={product}
                                        className="relative top-0 right-0"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="font-bold">
                                      Ajouter aux favoris
                                    </TooltipContent>
                                  </Tooltip>

                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() => {
                                          deleteCartProduct(product?._id);
                                          toast.success("Produit supprimé avec succès !");
                                        }}
                                        className="hoverEffect mr-1 h-4 w-4 text-gray-500 hover:text-red-600 md:h-5 md:w-5"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-red-600 font-bold">
                                      Supprimer le produit
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          </div>

                          <div className="flex h-36 flex-col items-start justify-between p-0.5 md:h-44 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="text-lg font-bold"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      );
                    })}

                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Réinitialiser le panier
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="lg:col-span-1">
                    <div className="hidden w-full rounded-lg border bg-white p-6 md:inline-block">
                      <h2 className="mb-4 text-xl font-semibold">Résumé de la commande</h2>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Sous-total</span>
                          <PriceFormatter amount={getSubTotalPrice()} />
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Réduction</span>
                          <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between text-lg font-semibold">
                          <span>Total</span>
                          <PriceFormatter
                            amount={getTotalPrice()}
                            className="text-lg font-bold text-black"
                          />
                        </div>

                        <Button
                          className="hoverEffect w-full rounded-full font-semibold tracking-wide"
                          size="lg"
                          disabled={loading}
                          onClick={handleCheckout}
                        >
                          {loading ? "Veuillez patienter..." : "Procéder au paiement"}
                        </Button>
                      </div>
                    </div>

                    {addresses && (
                      <div className="mt-5 rounded-md bg-white">
                        <Card>
                          <CardHeader>
                            <CardTitle>Adresse de livraison</CardTitle>
                          </CardHeader>

                          <CardContent>
                            <RadioGroup
                              defaultValue={addresses?.find((addr) => addr.default)?._id.toString()}
                            >
                              {addresses?.map((address) => (
                                <div
                                  key={address?._id}
                                  onClick={() => setSelectedAddress(address)}
                                  className={`mb-4 flex cursor-pointer items-center space-x-2 ${
                                    selectedAddress?._id === address?._id && "text-shop_dark_green"
                                  }`}
                                >
                                  <RadioGroupItem value={address?._id.toString()} />
                                  <Label className="grid flex-1 gap-1.5">
                                    <span className="font-semibold">{address?.name}</span>
                                    <span className="text-sm text-black/60">
                                      {address.address}, {address.city}, {address.state}{" "}
                                      {address.zip}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>

                            <Button variant="outline" className="mt-4 w-full">
                              Ajouter une nouvelle adresse
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div className="fixed bottom-0 left-0 w-full bg-white pt-2 md:hidden">
                  <div className="mx-4 rounded-lg border bg-white p-4">
                    <h2>Résumé de la commande</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Sous-total</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Réduction</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg font-bold text-black"
                        />
                      </div>

                      <Button
                        className="hoverEffect w-full rounded-full font-semibold tracking-wide"
                        size="lg"
                        disabled={loading}
                        onClick={handleCheckout}
                      >
                        {loading ? "Veuillez patienter..." : "Procéder au paiement"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
