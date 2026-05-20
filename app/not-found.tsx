import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-10 sm:px-6 md:py-32 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo />

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Vous cherchez quelque chose ?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Nous sommes désolés. L&apos;adresse web que vous avez saisie ne correspond à aucune page
            fonctionnelle sur notre site.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <Link
              href="/"
              className="bg-shop_dark_green/80 hover:bg-shop_dark_green focus:ring-amazonOrangeDark hoverEffect flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Aller à la page d&apos;accueil de Shopcart
            </Link>
            <Link
              href="/help"
              className="text-amazonBlue focus:ring-amazonBlue flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Aide
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Besoin d&apos;aide ? Visitez la{" "}
            <Link href="/help" className="text-amazon-blue hover:text-amazon-blue-dark font-medium">
              section d&apos;aide
            </Link>{" "}
            ou{" "}
            <Link
              href="/contact"
              className="text-amazon-blue hover:text-amazon-blue-dark font-medium"
            >
              contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
