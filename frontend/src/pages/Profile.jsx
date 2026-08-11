import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import "./Profile.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Profile = () => {
  const { user } = useApp();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const token = localStorage.getItem("fashcart_token");
      const response = await fetch(`${API_URL}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setOrders(data);
    };

    if (user) getOrders();
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <section className="stack">
      <div className="section-heading">
        <div>
          <p className="profile-eyebrow">Account</p>
          <h1>{user.fullName}</h1>
        </div>
        {user.role === "admin" && <Link className="button small" to="/admin">Admin dashboard</Link>}
      </div>

      <div className="profile-grid">
        <div className="panel profile-card">
          <span>Full name</span>
          <strong>{user.fullName}</strong>
        </div>
        <div className="panel profile-card">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>
        <div className="panel profile-card">
          <span>Phone</span>
          <strong>{user.phone || "Not added yet"}</strong>
        </div>
        <div className="panel profile-card">
          <span>City</span>
          <strong>{user.city || "Not added yet"}</strong>
        </div>
        <div className="panel profile-card profile-wide">
          <span>Address</span>
          <strong>{user.address || "No saved address yet"}</strong>
        </div>
      </div>

      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p className="muted">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="panel profile-order" key={order.id}>
            <div className="profile-order-header">
              <div>
                <strong>Order #{order.id.slice(-8)}</strong>
                <p className="muted">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <strong>${order.total.toFixed(2)}</strong>
                <p className="muted">{order.orderStatus}</p>
              </div>
            </div>

            <div className="profile-order-items">
              {order.items.map((item) => (
                <div className="profile-order-item" key={`${order.id}-${item.product}-${item.selectedSize}-${item.selectedColor}`}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <p className="muted">
                      Size {item.selectedSize.toUpperCase()} / {item.selectedColor} / Qty {item.quantity}
                    </p>
                  </div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Profile;
