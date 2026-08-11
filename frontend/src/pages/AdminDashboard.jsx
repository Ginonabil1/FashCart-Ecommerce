import { Edit, List, PackagePlus, ReceiptText, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext.jsx";
import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const categories = ["t-shirts", "jackets", "shoes", "shorts", "accessories", "bags"];
const sizes = ["xs", "s", "m", "l", "xl", "xxl", "40", "41", "42", "43", "44", "45"];
const colors = ["gray", "black", "white", "green", "blue", "pink", "purple", "red", "orange"];

const emptyForm = {
  name: "",
  category: "t-shirts",
  shortDescription: "",
  description: "",
  price: "",
  stock: "",
  sizes: [],
  colors: [],
  images: {}
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const AdminDashboard = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("add");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("fashcart_token");

  const loadProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    if (response.ok) setProducts(data);
  };

  const loadOrders = async () => {
    const response = await fetch(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    if (response.ok) setOrders(data);
  };

  const loadDashboard = () => {
    loadProducts();
    loadOrders();
  };

  useEffect(() => {
    if (user?.role === "admin") loadDashboard();
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  const changeField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleArrayValue = (field, value) => {
    setForm((current) => {
      const exists = current[field].includes(value);
      const nextValues = exists
        ? current[field].filter((item) => item !== value)
        : [...current[field], value];

      const nextImages = { ...current.images };
      if (field === "colors" && exists) delete nextImages[value];

      return { ...current, [field]: nextValues, images: nextImages };
    });
  };

  const uploadColorImage = async (color, file) => {
    if (!file) return;
    const imageData = await fileToDataUrl(file);
    setForm((current) => ({
      ...current,
      images: { ...current.images, [color]: imageData }
    }));
  };

  const validateForm = () => {
    if (form.sizes.length === 0) return "Select at least one size.";
    if (form.colors.length === 0) return "Select at least one color.";

    const missingImageColor = form.colors.find((color) => !form.images[color]);
    if (missingImageColor) return `Upload an image for ${missingImageColor}.`;

    return "";
  };

  const submitProduct = async (event) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const product = {
      name: form.name,
      category: form.category,
      shortDescription: form.shortDescription,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      sizes: form.sizes,
      colors: form.colors,
      images: form.images
    };

    const response = await fetch(
      editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`,
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      }
    );
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Product save failed.");
      return;
    }

    toast.success(editingId ? "Product updated." : "Product added.");
    setForm(emptyForm);
    setEditingId(null);
    setActiveTab("list");
    loadProducts();
  };

  const editProduct = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      stock: product.stock,
      sizes: product.sizes,
      colors: product.colors,
      images: product.images
    });
    setEditingId(product.id);
    setActiveTab("add");
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message || "Product delete failed.");
      return;
    }

    toast.success("Product deleted.");
    loadProducts();
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <section className="stack">
      <div className="section-heading">
        <div>
          <p className="admin-eyebrow">Admin</p>
          <h1>Dashboard</h1>
        </div>
        <div className="stats">
          <span>{products.length} products</span>
          <span>{orders.length} orders</span>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === "add" ? "active" : ""} onClick={() => setActiveTab("add")}>
          <PackagePlus size={18} /> Add Product
        </button>
        <button className={activeTab === "list" ? "active" : ""} onClick={() => setActiveTab("list")}>
          <List size={18} /> List Items
        </button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
          <ReceiptText size={18} /> Orders Details
        </button>
      </div>

      {activeTab === "add" && (
        <form className="panel product-form" onSubmit={submitProduct}>
          <div className="form-title">
            <h2>{editingId ? "Edit product" : "Add product"}</h2>
            {editingId && (
              <button type="button" className="icon-button" onClick={resetForm}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="form-grid">
            <label>
              Product name
              <input required value={form.name} onChange={(event) => changeField("name", event.target.value)} />
            </label>
            <label>
              Category
              <select value={form.category} onChange={(event) => changeField("category", event.target.value)}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Price
              <input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => changeField("price", event.target.value)} />
            </label>
            <label>
              Stock
              <input required min="0" step="1" type="number" value={form.stock} onChange={(event) => changeField("stock", event.target.value)} />
            </label>
          </div>

          <label>
            Short description
            <input required value={form.shortDescription} onChange={(event) => changeField("shortDescription", event.target.value)} />
          </label>

          <label>
            Description
            <textarea required rows="4" value={form.description} onChange={(event) => changeField("description", event.target.value)} />
          </label>

          <div className="admin-fieldset">
            <p>Product sizes</p>
            <div className="checkbox-grid">
              {sizes.map((size) => (
                <label className="check-option" key={size}>
                  <input type="checkbox" checked={form.sizes.includes(size)} onChange={() => toggleArrayValue("sizes", size)} />
                  <span>{size.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="admin-fieldset">
            <p>Product colors</p>
            <div className="checkbox-grid">
              {colors.map((color) => (
                <label className="check-option" key={color}>
                  <input type="checkbox" checked={form.colors.includes(color)} onChange={() => toggleArrayValue("colors", color)} />
                  <span className="color-dot" style={{ backgroundColor: color }} />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {form.colors.length > 0 && (
            <div className="admin-fieldset">
              <p>Upload images for selected colors</p>
              <div className="upload-grid">
                {form.colors.map((color) => (
                  <label className="upload-box" key={color}>
                    <span>{color}</span>
                    {form.images[color] && <img src={form.images[color]} alt={`${form.name || "Product"} ${color}`} />}
                    <input type="file" accept="image/*" onChange={(event) => uploadColorImage(color, event.target.files[0])} />
                  </label>
                ))}
              </div>
            </div>
          )}

          <button className="button">
            <Save size={18} /> {editingId ? "Save product" : "Add product"}
          </button>
        </form>
      )}

      {activeTab === "list" && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="table-product">
                      <img src={product.images[product.colors[0]]} alt={product.name} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td className="table-actions">
                    <button className="icon-button" onClick={() => editProduct(product)}>
                      <Edit size={16} />
                    </button>
                    <button className="icon-button danger" onClick={() => deleteProduct(product.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>User</th>
                <th>Products</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.slice(-8)}</td>
                  <td>
                    <strong>{order.user?.fullName || order.shippingDetails?.name || "Guest"}</strong>
                    <small>{order.user?.email || order.shippingDetails?.email}</small>
                  </td>
                  <td>
                    <div className="order-products">
                      {order.items.map((item) => (
                        <span key={`${order.id}-${item.product}-${item.selectedSize}-${item.selectedColor}`}>
                          {item.name} x {item.quantity}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.orderStatus}</td>
                  <td>${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
