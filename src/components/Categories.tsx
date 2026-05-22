"use client";

import { Footprints, Shield, Shirt, ShoppingBasket } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Jackets",
    icon: <Shield className="w-4 h-4" />,
    slug: "jackets",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 gap-3 rounded-[1.75rem] border border-black/5 bg-[rgba(255,255,255,0.72)] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.05)] backdrop-blur sm:grid-cols-4">
      {categories.map((category) => (
        <button
          type="button"
          className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium ${
            category.slug === selectedCategory ||
            (!selectedCategory && category.slug === "all")
              ? "bg-[#171717] text-white shadow-lg"
              : "bg-[#f7f2e8] text-[var(--muted)] hover:bg-white hover:text-black"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
