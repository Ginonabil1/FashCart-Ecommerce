import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../context/AppContext.jsx";
import "./Auth.css";

const Signup = () => {
  const { signUp } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", phone: "", address: "", city: "" });

  const submit = async (event) => {
    event.preventDefault();
    try {
      await signUp(form);
      toast.success("Account created.");
      navigate("/products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="auth-card" onSubmit={submit}>
      <h1>Create account</h1>
      {Object.keys(form).map((field) => (
        <label key={field}>
          {field}
          <input type={field === "password" ? "password" : field === "email" ? "email" : "text"} required={["fullName", "email", "password"].includes(field)} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
        </label>
      ))}
      <button className="button">Create account</button>
      <p className="muted">Already have an account? <Link to="/login">Sign in</Link></p>
    </form>
  );
};

export default Signup;
