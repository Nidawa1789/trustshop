import { cn } from "@/lib/utils";
import React from "react";

const Title = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2
      className={cn(
        "text-shop_dark_green font-sans text-2xl tracking-wide capitalize md:text-3xl",
        className,
      )}
    >
      {children}
    </h2>
  );
};

const SubTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h3 className={cn("font-sans font-semibold text-gray-900", className)}>{children}</h3>;
};
const SubText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <p className={cn("text-sm text-gray-600", className)}>{children}</p>;
};

export { Title, SubText, SubTitle };
