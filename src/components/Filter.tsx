"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const colors = ["gray", "white", "green", "pink", "black", "blue", "purple", "red", "orange"];
const sizes = ["s", "m", "l", "xl", "xxl", "40", "41", "42", "43", "44"];

const Filter = ({ resultsCount }: { resultsCount: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentSort = searchParams.get("sort") || "newest";
  const currentColor = searchParams.get("color") || "";
  const currentSize = searchParams.get("size") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleFilter = (value: string) => {
    updateParams({ sort: value });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    ["sort", "size", "color", "minPrice", "maxPrice", "search", "category"].forEach(
      (key) => params.delete(key)
    );
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="my-6 space-y-4 rounded-[1.5rem] border border-black/5 bg-white/80 p-4 shadow-[0_10px_25px_rgba(0,0,0,0.04)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Refine products
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {resultsCount} matching item{resultsCount === 1 ? "" : "s"}
          </p>
        </div>
        <button
          type="button"
          onClick={clearFilters}
          className="w-fit rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black hover:bg-[#f7f2e8]"
        >
          Clear filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2">
          <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Sort
          </label>
          <select
            name="sort"
            id="sort"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black outline-none"
            value={currentSort}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="size" className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Size
          </label>
          <select
            id="size"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black outline-none"
            value={currentSize}
            onChange={(e) => updateParams({ size: e.target.value })}
          >
            <option value="">All sizes</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="color" className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Color
          </label>
          <select
            id="color"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black outline-none"
            value={currentColor}
            onChange={(e) => updateParams({ color: e.target.value })}
          >
            <option value="">All colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="min-price" className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Min price
          </label>
          <input
            id="min-price"
            type="number"
            min="0"
            value={currentMinPrice}
            onChange={(e) => updateParams({ minPrice: e.target.value })}
            placeholder="0"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="max-price" className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Max price
          </label>
          <input
            id="max-price"
            type="number"
            min="0"
            value={currentMaxPrice}
            onChange={(e) => updateParams({ maxPrice: e.target.value })}
            placeholder="100"
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
