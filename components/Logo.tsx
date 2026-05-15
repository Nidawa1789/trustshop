import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ className, spanDesign }: { className?: string; spanDesign?: string }) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2
        className={cn(
          "text-shop_dark_green hover:text-shop_light_green hoverEffect group font-sans text-2xl font-black tracking-wider uppercase transition-colors duration-300",
          className,
        )}
      >
        Trustsho
        <span
          className={cn(
            "text-shop_light_green group-hover:text-shop_dark_green transition-colors duration-300",
            spanDesign,
          )}
        >
          p
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
