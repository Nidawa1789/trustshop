import React from "react";
import Link from "next/link";
import { productType } from "@/constants/data";

interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, setSelectedTab }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType.map((item) => (
          <button
            onClick={() => setSelectedTab(item.value)}
            key={item.value}
            className={`border-shop_light_green/20 hover:bg-shop_light_green hoverEffect rounded-full border px-4 py-1.5 hover:text-white md:px-6 md:py-2 ${selectedTab === item.value ? "bg-shop_light_green border-shop_light_green text-white" : "bg-shop_light_green/20 border-shop_light_green/20"}`}
          >
            {item.title}
          </button>
        ))}
      </div>
      <Link
        href="/shop"
        className={`border-shop_light_green/30 hover:bg-shop_light_green hoverEffect rounded-full border px-4 py-1.5 hover:text-white md:px-6 md:py-2`}
      >
        Voir tous
      </Link>
    </div>
  );
};

export default HomeTabBar;
