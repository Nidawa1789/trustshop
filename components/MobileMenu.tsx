"use client";
import { AlignLeft } from "lucide-react";
import React, { useState } from "react";
import SideMenu from "./SideMenu";

const MobileMenu = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsSideBarOpen((open) => !open)}
        aria-expanded={isSideBarOpen}
        aria-controls="mobile-navigation"
        className="hover:cursor-pointer"
      >
        <AlignLeft className="hover:text-darkColor hoverEffect" />
      </button>
      <SideMenu
        id="mobile-navigation"
        isOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
      />
    </div>
  );
};

export default MobileMenu;
