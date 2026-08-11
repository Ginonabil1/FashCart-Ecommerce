import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import "./Products.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const categories = ["all", "t-shirts", "jackets", "shoes", "shorts"];
const colors = ["gray", "black", "white", "green", "blue", "pink", "purple", "red", "orange"];

const Products = () => {
  const [filters, setFilters] = useState({ category: "all", sort: "newest", search: "", color: "", size: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    setError("");
    const getProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products?${query}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch products");
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [query]);

  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <div className="catalog-layout">
      <aside className="filters">
        <h2>Filters</h2>
        <label>
          Search
          <div className="input-icon">
            <Search size={16} />
            <input value={filters.search} onChange={(e) => update("search", e.target.value)} placeholder="Search products" />
          </div>
        </label>
        <label>
          Category
          <select value={filters.category} onChange={(e) => update("category", e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select value={filters.sort} onChange={(e) => update("sort", e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="asc">Price low to high</option>
            <option value="desc">Price high to low</option>
          </select>
        </label>
        <label>
          Size
          <input value={filters.size} onChange={(e) => update("size", e.target.value.toLowerCase())} placeholder="s, m, 42" />
        </label>
        <label>
          Color
          <select value={filters.color} onChange={(e) => update("color", e.target.value)}>
            <option value="">any</option>
            {colors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </label>
      </aside>
      <section className="stack">
        <div className="section-heading">
          <div>
            <p className="products-eyebrow">Shop</p>
            <h1 style={{fontSize: '25px'}}>All products</h1>
          </div>
          <p className="muted">{products.length} found</p>
        </div>
        {loading ? <p className="muted">Loading products...</p> : error ? (
          <p className="notice-error">{error}. Make sure the backend is running on port 5000.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
