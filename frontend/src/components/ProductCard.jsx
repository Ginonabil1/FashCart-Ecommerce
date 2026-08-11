import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext.jsx";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const size = product.sizes?.[0];
  const { addToCart } = useApp();

  const handleAdd = () => {
    addToCart(product, size, selectedColor, 1);
    toast.success("Product added to cart.");
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image">
        <img src={product.images?.[selectedColor]} alt={product.name} />
        <span>{product.category?.replace("-", " ")}</span>
      </Link> 
      <div className="product-body">
        <div className="product-copy">
          <h3>{product.name}</h3>
          <p>{product.shortDescription}</p>
        </div>
        <div className="card-row product-meta-row">
          <strong>${Number(product.price).toFixed(2)}</strong>
          <div className="product-colors">
            {product.colors.map((color) => (
              <button
                type="button"
                aria-label={`Select ${color}`}
                className={selectedColor === color ? "active" : ""}
                key={color}
                onClick={() => setSelectedColor(color)}
              >
                <span style={{ backgroundColor: color }} />
              </button>
            ))}
          </div>
        </div>
        <div className="card-row product-action-row">
          <small className="product-size">Size: {size?.toUpperCase()}</small>
          <button className="icon-button dark" onClick={handleAdd} aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
