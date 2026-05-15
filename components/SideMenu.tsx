"use client";
import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import Link from "next/link";
import { headerData } from "@/constants/data";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "./hooks";
interface SideBarProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SideBarProps> = ({ id, isOpen, onClose }) => {
  const pathname = usePathname();
  const sideBarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      id={id}
      className={`fixed inset-y-0 left-0 z-50 h-screen w-full bg-black/50 text-white/70 shadow-xl ${isOpen ? "translate-x-0" : "-translate-x-full"} hoverEffect`}
    >
      <div
        ref={sideBarRef}
        className="border-r-shop_light_green flex h-screen max-w-96 min-w-72 flex-col gap-6 border-r bg-black p-10 text-left"
      >
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          <button
            type="button"
            onClick={onClose}
            className="hover:text-shop_light_green hoverEffect"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              href={item?.href}
              key={item?.title}
              className={`hover:text-shop_light_green hoverEffect ${pathname === item?.href && "text-white"}`}
            >
              {item?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;
