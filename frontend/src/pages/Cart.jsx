import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext.jsx";
import "./Cart.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Cart = () => {
  const { cart, removeFromCart, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({ name: "", email: "", phone: "", address: "", city: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.1;
  const shippingFee = subtotal > 0 ? 10 : 0;
  const total = subtotal - discount + shippingFee;

  const checkout = async (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("fashcart_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      };

      if (paymentMethod === "stripe") {
        const stripeResponse = await fetch(`${API_URL}/payments/stripe/create-checkout-session`, {
          method: "POST",
          headers,
          body: JSON.stringify({ items: cart })
        });
        const session = await stripeResponse.json();
        if (!stripeResponse.ok) throw new Error(session.message || "Stripe checkout failed.");
        window.location.href = session.url;
        return;
      }

      if (paymentMethod === "razorpay") {
        const razorpayResponse = await fetch(`${API_URL}/payments/razorpay/order`, {
          method: "POST",
          headers,
          body: JSON.stringify({ amount: total })
        });
        const razorpayOrder = await razorpayResponse.json();
        if (!razorpayResponse.ok) throw new Error(razorpayOrder.message || "Razorpay checkout failed.");
      }

      const orderResponse = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify({ items: cart, shippingDetails, paymentMethod })
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(order.message || "Order failed.");

      clearCart();
      toast.success("Order placed successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="checkout-grid">
      <div className="stack">
        <h1>Your cart</h1>
        {cart.length === 0 ? (
          <p className="muted">Your cart is empty. <Link to="/products">Shop products</Link></p>
        ) : cart.map((item) => (
          <div className="cart-item" key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
            <img src={item.images[item.selectedColor]} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.quantity} x {item.selectedSize.toUpperCase()} / {item.selectedColor}</p>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
            <button className="icon-button" onClick={() => removeFromCart(item)}><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
      <form className="panel stack" onSubmit={checkout}>
        <h2>Delivery and payment</h2>
        {["name", "email", "phone", "address", "city"].map((field) => (
          <label key={field}>
            {field}
            <input required value={shippingDetails[field]} onChange={(e) => setShippingDetails((current) => ({ ...current, [field]: e.target.value }))} />
          </label>
        ))}
        <label>
          Payment method
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cod">Cash on Delivery</option>
            <option value="stripe">Stripe</option>
            <option value="razorpay">Razorpay</option>
          </select>
        </label>
        <div className="summary">
          <span>Subtotal <strong>${subtotal.toFixed(2)}</strong></span>
          <span>Discount <strong>-${discount.toFixed(2)}</strong></span>
          <span>Shipping <strong>${shippingFee.toFixed(2)}</strong></span>
          <span>Total <strong>${total.toFixed(2)}</strong></span>
        </div>
        <button className="button" disabled={cart.length === 0}>Place order</button>
      </form>
    </section>
  );
};

export default Cart;
