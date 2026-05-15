import React from "react";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <span className="hover:text-lightColor hoverEffect cursor-pointer text-sm font-semibold">
        Connexion
      </span>
    </SignInButton>
  );
};

export default SignIn;
