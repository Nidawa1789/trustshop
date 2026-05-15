import React from "react";

import Link from "next/link";
import Image from "next/image";
import { banner_1 } from "@/images";
import { Title } from "./ui/text";

const HomeBanner = () => {
  return (
    <div className="bg-shop_light_pink flex items-center justify-between rounded-lg px-10 py-16 md:py-0 lg:px-24">
      <div className="space-y-5">
        <Title>
          Profitez jusqu&apos;à 50% de réduction
          <br />
          Une Selection de casque audio
        </Title>
        <Link
          href="/products"
          className="bg-shop_dark_green/90 hover:bg-shop_dark_green hoverEffect rounded-md px-5 py-2 font-semibold text-white/90 hover:text-white"
        >
          Acheter
        </Link>
      </div>
      <div>
        <Image src={banner_1} alt="Home Banner" className="hidden w-96 md:inline-flex" />
      </div>
    </div>
  );
};

export default HomeBanner;
