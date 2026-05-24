"use client";

import { useAppContext } from "@/context/AppContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useAppContext();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!hasHydrated) return null;
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      {cartCount > 0 && (
        <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;
