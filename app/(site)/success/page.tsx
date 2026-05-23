"use client";

import useStore from "@/store";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Home, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const SuccessPageContent = () => {
  const { resetCart } = useStore();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (orderNumber) {
      resetCart();
    }
  }, [orderNumber, resetCart]);
  return (
    <div className="mx-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full max-w-xl flex-col gap-8 rounded-2xl bg-white p-6 text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black shadow-lg"
        >
          <Check className="h-10 w-10 text-white" />
        </motion.div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <div className="mb-4 space-y-4 text-left">
          <p className="text-gray-700">
            Thank you for your purchase. We&apos;re processing your order and will ship it soon. A
            confirmation email with your order details will be sent to your inbox shortly.
          </p>
          <p className="text-gray-700">
            Order Number: <span className="font-semibold text-black">{orderNumber}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg bg-black px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-800"
          >
            <Home className="mr-2 h-5 w-5" />
            Home
          </Link>
          <Link
            href="/orders"
            className="bg-lightGreen border-lightGreen flex items-center justify-center rounded-lg border px-4 py-3 font-semibold text-black shadow-md transition-all duration-300 hover:bg-gray-100"
          >
            <Package className="mr-2 h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center rounded-lg bg-black px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-gray-800"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
