"use client";

import { useEffect } from "react";
import Link from "next/link";

const GlobalErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-black/5 bg-white/80 p-10 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
        Something went wrong
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-black">
        We hit an unexpected error.
      </h1>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
        The page failed to load correctly. You can retry the request or go back
        to the storefront.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default GlobalErrorPage;
