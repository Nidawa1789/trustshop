"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { emptyCart } from "@/images";
import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 py-10 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          className="relative mx-auto h-48 w-48"
        >
          <Image
            src={emptyCart}
            alt="Empty shopping cart"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
          <motion.div
            animate={{
              x: [0, -10, 10, 0],
              y: [0, -5, 5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
            className="absolute -top-4 -right-4 rounded-full bg-blue-500 p-2"
          >
            <ShoppingCart size={24} className="text-white" />
          </motion.div>
        </motion.div>

        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Votre panier est vide</h2>
          <p className="text-gray-600">
            Il semble que vous n&apos;avez rien ajouté à votre panier. Changeons cela et trouvons
            quelques produits incroyables pour vous!
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="bg-darkColor/5 border-darkColor/20 hover:border-darkColor hover:bg-darkColor hoverEffect block rounded-full border py-2.5 text-center text-sm font-semibold tracking-wide hover:text-white"
          >
            Découvrir les produits
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
