"use client";

import { Suspense } from "react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { Bell, Home, LayoutGrid, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser, signOut, hasHydrated } = useAppContext();

  const handleSignOut = () => {
    signOut();
    toast.info("Signed out successfully.");
  };

  return (
    <nav className="sticky top-4 z-20 mb-8 rounded-[1.75rem] border border-black/5 bg-[rgba(255,255,255,0.72)] px-4 py-4 shadow-[0_14px_42px_rgba(0,0,0,0.06)] backdrop-blur sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#171717] p-2 shadow-lg">
              <Image
                src="/logo.png"
                alt="VibeCart"
                width={34}
                height={34}
                className="h-7 w-7"
              />
            </div>
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-2xl leading-none text-black">
                VibeCart
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">
                Modern Storefront
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/products"
              className="rounded-full border border-black/10 p-2 text-[var(--muted)]"
            >
              <LayoutGrid className="h-4 w-4" />
            </Link>
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-black/5 bg-[#f6f1e8] p-1 lg:flex">
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] hover:bg-white hover:text-black"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] hover:bg-white hover:text-black"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] hover:bg-white hover:text-black"
          >
            Cart
          </Link>
          {hasHydrated && currentUser && (
            <Link
              href="/profile"
              className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] hover:bg-white hover:text-black"
            >
              Profile
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:min-w-[420px] lg:justify-end">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-black/10 p-2 text-[var(--muted)] hover:bg-white sm:inline-flex"
              >
                <Home className="h-4 w-4" />
              </Link>
              <button className="rounded-full border border-black/10 p-2 text-[var(--muted)] hover:bg-white sm:inline-flex">
                <Bell className="h-4 w-4" />
              </button>
              <div className="hidden sm:block">
                <ShoppingCartIcon />
              </div>
            </div>
            {hasHydrated && currentUser ? (
              <div className="flex items-center gap-2">
              <div className="hidden rounded-full bg-[#f6f1e8] px-4 py-2 text-sm sm:block">
                <span className="text-[var(--muted)]">Hi, </span>
                <span className="font-semibold text-black">
                  {currentUser.fullName.split(" ")[0]}
                </span>
              </div>
              <Link
                href="/profile"
                className="hidden rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black sm:inline-flex"
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-black"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-black"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
