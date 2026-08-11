import { useEffect, useState } from "react";
import ProductCard from "./ProductCard.jsx";
import "./ProductGrid.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProductGrid = ({
  eyebrow = "Catalog",
  title = "Products",
  description = "Browse the latest edit, refine by category, and explore a storefront designed to feel more like a real brand presentation.",
  limit,
  sort = "newest"
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const getProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products?sort=${sort}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch products");
        setProducts(limit ? data.slice(0, limit) : data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }; 

    getProducts();
  }, [limit, sort]);

  return (
    <section className="stack">
      <div className="section-heading-grid">
        <div>
          <p className="product-grid-eyebrow">{eyebrow}</p>
          <p className="muted section-copy">{description}</p>
        </div>
      </div>
      {loading ? (
        <p className="muted">Loading products...</p>
      ) : error ? (
        <p className="notice-error">{error}. Make sure the backend is running on port 5000.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
