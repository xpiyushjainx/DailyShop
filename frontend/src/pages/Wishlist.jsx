import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const Wishlist = () => {
  const { items } = useWishlist();

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your wishlist</h1>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">
          Your wishlist is empty. Add products you like from the home page.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-4">
        <Link to="/" className="text-xs text-emerald-400 hover:underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
};

export default Wishlist;
