import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.find((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((p) => p._id !== id));
  };

  const isInWishlist = (id) => {
    return items.some((p) => p._id === id);
  };

  const toggleWishlist = (product) => {
    setItems((prev) => {
      if (prev.find((p) => p._id === product._id)) {
        return prev.filter((p) => p._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const value = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
