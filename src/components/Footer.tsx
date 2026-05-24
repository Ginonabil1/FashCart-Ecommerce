import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 overflow-hidden rounded-[2rem] border border-black/5 bg-[#151515] p-8 text-white shadow-[0_22px_60px_rgba(0,0,0,0.15)] sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/8 p-2">
              <Image src="/logo.png" alt="FashCart" width={34} height={34} />
            </div>
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-2xl leading-none">
                FashCart
              </p>
            </div>
          </Link>

          <p className="text-sm text-white/45">© 2026 FashCart. All rights reserved.</p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-white/65">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Navigate
          </p>
          <Link href="/">Homepage</Link>
          <Link href="/products">All Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/login">Sign In</Link>
        </div>

        <div className="flex flex-col gap-4 text-sm text-white/65">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Collection
          </p>
          <Link href="/products?category=t-shirts">T-Shirts</Link>
          <Link href="/products?category=jackets">Jackets</Link>
          <Link href="/products?category=shoes">Shoes</Link>
          <Link href="/products?sort=desc">Premium Picks</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
