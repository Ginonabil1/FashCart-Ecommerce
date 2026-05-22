import Link from "next/link";
import { products } from "@/lib/products";
import { ProductsType } from "@/types";
import Categories from "./Categories";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

const ProductList = ({
  category,
  sort,
  search,
  size,
  color,
  minPrice,
  maxPrice,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  size?: string;
  color?: string;
  minPrice?: string;
  maxPrice?: string;
  params: "homepage" | "products";
}) => {
  const normalizedSearch = search?.trim().toLowerCase() || "";
  const normalizedColor = color?.trim().toLowerCase();
  const normalizedSize = size?.trim().toLowerCase();
  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  let filteredProducts: ProductsType = products.filter((product) => {
    const matchesCategory =
      !category || category === "all" ? true : product.category === category;

    const matchesSearch = normalizedSearch
      ? `${product.name} ${product.shortDescription} ${product.description}`
          .toLowerCase()
          .includes(normalizedSearch)
      : true;

    const matchesSize = normalizedSize
      ? product.sizes.some((productSize) => productSize.toLowerCase() === normalizedSize)
      : true;

    const matchesColor = normalizedColor
      ? product.colors.some(
          (productColor) => productColor.toLowerCase() === normalizedColor
        )
      : true;

    const matchesMinPrice = Number.isFinite(min) ? product.price >= (min as number) : true;
    const matchesMaxPrice = Number.isFinite(max) ? product.price <= (max as number) : true;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesSize &&
      matchesColor &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  if (sort === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sort === "oldest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );
  } else {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );
  }

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
            Curated collection
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-black">
            A cleaner shopping experience with stronger product presentation.
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            Browse the latest edit, refine by category, and explore a storefront
            designed to feel more like a real brand presentation.
          </p>
          <p className="mt-4 text-sm font-medium text-black">
            {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found
          </p>
        </div>
        <Link
          href={category ? `/products/?category=${category}` : "/products"}
          className="inline-flex w-fit items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black shadow-[0_10px_25px_rgba(0,0,0,0.04)] hover:-translate-y-0.5"
        >
          View full catalog
        </Link>
      </div>
      <Categories />
      {params === "products" && <Filter resultsCount={filteredProducts.length} />}
      {filteredProducts.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-black/15 bg-white/70 px-6 py-12 text-center text-sm text-[var(--muted)]">
          No products matched your current filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
