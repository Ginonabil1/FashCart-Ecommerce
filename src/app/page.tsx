import ProductList from "@/components/ProductList";
import Image from "next/image";

const Homepage = async ({
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
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      <ProductList
        category={category}
        sort={sort}
        search={search}
        size={size}
        color={color}
        minPrice={minPrice}
        maxPrice={maxPrice}
        params="homepage"
      />
    </div>
  );
};

export default Homepage;
