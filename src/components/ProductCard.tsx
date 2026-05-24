"use client";

import { useAppContext } from "@/context/AppContext";
import { ProductType } from "@/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart, toggleWishlist, isWishlisted, hasHydrated, currentUser } =
    useAppContext();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product.id);
    toast.info(
      added ? `${product.name} added to wishlist` : `${product.name} removed from wishlist`
    );
  };

  const wishlisted = hasHydrated && isWishlisted(product.id);

  return (
    <div className="group overflow-hidden rounded-[1.75rem] border border-black/5 bg-[rgba(255,255,255,0.8)] shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-[linear-gradient(180deg,#f7f2e8,#ece3d4)]">
          <div className="absolute left-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {product.category.replace("-", " ")}
          </div>
          {hasHydrated && currentUser && (
            <button
              type="button"
              aria-label="Toggle wishlist"
              onClick={(event) => {
                event.preventDefault();
                handleWishlist();
              }}
              className={`absolute right-4 top-4 z-10 rounded-full p-2 cursor-pointer ${
                wishlisted ? "bg-[#171717] text-white" : "bg-white/85 text-[var(--muted)]"
              }`}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
            </button>
          )}
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-5 p-5">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-black">{product.name}</h2>
          <p className="text-sm leading-6 text-[var(--muted)]">
            {product.shortDescription}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Price
            </p>
            <p className="mt-1 text-2xl font-semibold text-black">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              colors
            </p>
            <div className="mt-2 flex items-center justify-end gap-2">
              {product.colors.map((color) => (
                <button
                  type="button"
                  aria-label={`Select ${color}`}
                  className={`rounded-full p-[2px] ${
                    productTypes.color === color
                      ? "border border-black/25"
                      : "border border-transparent"
                  }`}
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <span
                    className="block h-4 w-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 text-xs">
          <div className="flex flex-col gap-2">
            <span className="uppercase tracking-[0.2em] text-[var(--muted)]">
              Size
            </span>
            <select
              name="size"
              id="size"
              className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-black outline-none"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>     
          <div >
          <button
            onClick={handleAddToCart}
            className="inline-flex cursor-pointer gap-2 rounded-full bg-[#171717] px-4 py-2 text-sm font-medium text-white shadow-lg hover:-translate-y-0.5 hover:bg-black"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
