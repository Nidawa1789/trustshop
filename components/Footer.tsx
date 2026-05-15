import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "@/components/ui/text";
import { categoriesData, quickLinksData } from "@/constants/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <Container>
        <FooterTop />
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <SubText className="text-sm text-gray-600">
              Découvrez les collections de mobilier soigneusement sélectionnées chez Trustshop, qui
              allient style et confort pour embellir vos intérieurs.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_dark_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Liens rapides</SubTitle>
            <ul className="mt-4 space-y-3">
              {quickLinksData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green hoverEffect hoverEffect font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Catégories</SubTitle>
            <ul className="mt-4 space-y-3">
              {categoriesData.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`/category/${item.href}`}
                    className="hover:text-shop_light_green hoverEffect hoverEffect font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full space-y-4">
            <SubTitle>Nouveautés</SubTitle>
            <SubText>
              Abonnez-vous à notre newsletter pour recevoir les dernières nouveautés
            </SubText>
            <form className="flex w-full min-w-0 flex-col gap-3">
              <Input
                placeholder="Entrez votre email"
                type="email"
                required
                className="h-10 w-full min-w-0 bg-white text-base md:text-sm"
              />
              <Button
                type="submit"
                className="h-10 w-full rounded-lg border-0 bg-black text-white hover:bg-black/90"
              >
                Abonnez-vous
              </Button>
            </form>
          </div>
        </div>
        <div className="py-6 text-center text-sm text-gray-600">
          <div>
            Copyright © {new Date().getFullYear()} <Logo className="text-sm" />. Tous droits
            réservés.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
