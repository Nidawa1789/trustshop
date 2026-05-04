import React from "react";
import { SignInButton } from "@clerk/nextjs";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <span className="text-sm font-semibold hover:text-lightColor hoverEffect cursor-pointer">
        Connexion
      </span>
    </SignInButton>
  );
};

export default SignIn;
