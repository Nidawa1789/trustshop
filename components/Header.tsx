import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { Show, UserButton } from "@clerk/nextjs";

const Header = async () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 py-5 backdrop-blur-md">
      <Container className="text-lightColor flex items-center justify-between">
        <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Show when="signed-out">
            <SignIn />
          </Show>
        </div>
      </Container>
    </header>
  );
};

export default Header;
