"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="text-lightColor hidden w-1/3 items-center gap-7 text-sm font-semibold capitalize md:inline-flex">
      {headerData?.map((item) => (
        <Link
          href={item?.href}
          key={item?.title}
          className={`hover:text-shop_light_green hoverEffect group relative ${pathname === item?.href && "text-shop_light_green"}`}
        >
          {item?.title}{" "}
          <span
            className={`bg-shop_light_green hoverEffect absolute -bottom-0.5 left-1/2 h-0.5 w-0 group-hover:left-0 group-hover:w-1/2 ${pathname === item?.href && "w-1/2"}`}
          ></span>
          <span
            className={`bg-shop_light_green hoverEffect absolute right-1/2 -bottom-0.5 h-0.5 w-0 group-hover:right-0 group-hover:w-1/2 ${pathname === item?.href && "w-1/2"}`}
          ></span>
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
