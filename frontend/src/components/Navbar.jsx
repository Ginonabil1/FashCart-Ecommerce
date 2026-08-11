import { Bell, Home, LayoutDashboard, LogOut, Menu, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { cart, user, signOut } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="container site-header">
      <div className="nav">
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"><img src="/logo.png" alt="FashCart" /></span>
          <span className="brand-text">
            <strong>FashCart</strong>
            <small>Modern Store</small>
          </span>
        </Link>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
          <nav className="nav-links">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/products" onClick={closeMenu}>Shop</NavLink>
            <NavLink to="/cart" onClick={closeMenu}>Cart</NavLink>
            {user && <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>}
            {user?.role === "admin" && (
              <NavLink to="/admin" onClick={closeMenu}>
                <LayoutDashboard size={18} /> Admin
              </NavLink>
            )}
          </nav>
          <div className="nav-actions">
            <Link className="icon-link desktop-icon" to="/" aria-label="Home" onClick={closeMenu}>
              <Home size={18} />
            </Link>
            <button className="icon-button desktop-icon" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <Link className="icon-link" to="/cart" aria-label="Cart" onClick={closeMenu}>
              <ShoppingCart size={19} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </Link>
            {user ? (
              <>
                <Link className="icon-link" to="/profile" aria-label="Profile" onClick={closeMenu}>
                  <User size={19} />
                </Link>
                <button className="icon-button" onClick={() => { signOut(); closeMenu(); }} aria-label="Sign out">
                  <LogOut size={19} />
                </button>
              </>
            ) : (
              <Link className="button small" to="/login" onClick={closeMenu}>
                <ShoppingBag size={16} /> Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
