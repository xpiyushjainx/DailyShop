import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) {
        return prev.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = { items, addToCart, removeFromCart, clearCart, totalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
