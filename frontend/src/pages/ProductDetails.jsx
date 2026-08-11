import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext.jsx";
import "./ProductDetails.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useApp();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`${API_URL}/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setSelectedColor(data.colors[0]);
      setSelectedSize(data.sizes[0]);
    };

    getProduct();
  }, [id]);

  if (!product) return <p className="muted">Loading product...</p>;

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success("Product added to cart.");
  };

  return (
    <section className="details-grid">
      <div className="details-image">
        <img src={product.images[selectedColor]} alt={product.name} />
      </div>
      <div className="details-copy">
        <p className="details-eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong className="price">${Number(product.price).toFixed(2)}</strong>
        <div className="option-group">
          <span>Size</span>
          <div className="chips">
            {product.sizes.map((size) => (
              <button className={selectedSize === size ? "active" : ""} onClick={() => setSelectedSize(size)} key={size}>{size}</button>
            ))}
          </div>
        </div>
        <div className="option-group">
          <span>Color</span>
          <div className="swatches">
            {product.colors.map((color) => (
              <button className={selectedColor === color ? "active" : ""} onClick={() => setSelectedColor(color)} key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
        <div className="quantity">
          <button onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={16} /></button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((value) => value + 1)}><Plus size={16} /></button>
        </div>
        <button className="button" onClick={handleAdd}>
          <ShoppingCart size={18} /> Add to cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetails;
