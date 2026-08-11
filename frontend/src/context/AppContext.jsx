import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("fashcart_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("fashcart_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("fashcart_cart", JSON.stringify(cart));
  }, [cart]);

  const saveSession = (payload) => {
    localStorage.setItem("fashcart_token", payload.token);
    localStorage.setItem("fashcart_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const signIn = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || "Login failed.");
    saveSession(payload);
    return payload.user;
  };

  const signUp = async (form) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || "Registration failed.");
    saveSession(payload);
    return payload.user;
  };

  const signOut = () => {
    localStorage.removeItem("fashcart_token");
    localStorage.removeItem("fashcart_user");
    setUser(null);
  };

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCart((current) => {
      const existing = current.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [
        ...current,
        {
          ...product,
          selectedSize,
          selectedColor,
          quantity
        }
      ];
    });
  };

  const removeFromCart = (item) => {
    setCart((current) =>
      current.filter(
        (entry) =>
          !(
            entry.id === item.id &&
            entry.selectedSize === item.selectedSize &&
            entry.selectedColor === item.selectedColor
          )
      )
    );
  };

  const clearCart = () => setCart([]);

  const value = useMemo(
    () => ({
      user,
      cart,
      signIn,
      signUp,
      signOut,
      addToCart,
      removeFromCart,
      clearCart
    }),
    [user, cart]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
};
