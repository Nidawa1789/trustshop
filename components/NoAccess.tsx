import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = ({
  details = "Connectez-vous pour voir les articles de votre panier et passer à la caisse. Ne manquez pas vos produits préférés !",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 p-4 py-12 md:py-32">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex flex-col items-center">
          <Logo />
          <CardTitle className="text-center text-2xl font-bold">Bon retour !</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-darkColor/80 text-center font-medium">{details}</p>

          <SignInButton mode="modal">
            <Button className="w-full" size="lg">
              Se connecter
            </Button>
          </SignInButton>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-muted-foreground text-center text-sm">
            Vous n’avez pas de compte ?
          </div>

          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full" size="lg">
              Créer un compte
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
