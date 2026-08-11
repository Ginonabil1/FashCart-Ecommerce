import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext.jsx";
import "./Auth.css";

const Login = () => {
  const { signIn } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const user = await signIn(form.email, form.password);
      toast.success("Signed in successfully.");
      navigate(user.role === "admin" ? "/admin" : "/products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="auth-card" onSubmit={submit}>
      <h1>Sign in</h1>
      <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      <button className="button">Sign in</button>
      <p className="muted">No account? <Link to="/signup">Create one</Link></p>
      <p className="muted">Admin seed login: admin@fashcart.com / admin12345</p>
    </form>
  );
};

export default Login;
