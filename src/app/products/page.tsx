import ProductList from "@/components/ProductList";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
    size?: string;
    color?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) => {
  const { category, sort, search, size, color, minPrice, maxPrice } =
    await searchParams;
  return (
    <div className="">
      <ProductList
        category={category}
        sort={sort}
        search={search}
        size={size}
        color={color}
        minPrice={minPrice}
        maxPrice={maxPrice}
        params="products"
      />
    </div>
  );
};

export default ProductsPage;
