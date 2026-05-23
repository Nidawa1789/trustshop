import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <span
        className="hover:text-lightColor hoverEffect inline-flex cursor-pointer items-center justify-center text-sm font-semibold"
        aria-label="Connexion"
      >
        <LogIn className="h-5 w-5 sm:hidden" />
        <span className="hidden sm:inline">Connexion</span>
      </span>
    </SignInButton>
  );
};

export default SignIn;
