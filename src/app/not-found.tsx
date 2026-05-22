import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-black/5 bg-white/80 p-10 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl text-black">
        This page does not exist.
      </h1>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
        The content you are looking for may have moved or the link may be
        incorrect.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white"
      >
        Return to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
