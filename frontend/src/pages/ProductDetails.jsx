import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/products/${id}`)
      .then((data) => {
        setProduct(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Failed to load product");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!product) return;

    addToCart(product);

    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  const handleWishlistClick = () => {
    if (!product) return;
    toggleWishlist(product);
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-slate-400">Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-6">
        <p className="text-sm text-red-400 mb-4">
          {error || "Product not found."}
        </p>
        <Link to="/" className="text-xs text-emerald-400 underline">
          ← Back to home
        </Link>
      </main>
    );
  }

  const inWishlist = isInWishlist(product._id);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid gap-6 md:grid-cols-[1.2fr,1fr]">
        {/* Image */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-72 object-cover"
          />
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 text-xl leading-none px-2 py-1 rounded-full bg-slate-900/70 hover:bg-slate-900"
          >
            <span className={inWishlist ? "text-red-400" : "text-slate-200"}>
              {inWishlist ? "♥" : "♡"}
            </span>
          </button>
        </div>

        {/* Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
          <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-slate-300">{product.description}</p>

          <div className="mt-2 mb-3">
            <span className="text-lg font-semibold text-emerald-400">
              ₹{product.price}
            </span>
            {product.inStock ? (
              <span className="ml-3 text-xs text-emerald-400">● In stock</span>
            ) : (
              <span className="ml-3 text-xs text-red-400">● Out of stock</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-lg border border-emerald-500 py-2 text-sm font-semibold hover:bg-emerald-500 hover:text-slate-950"
            >
              Add to cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 rounded-lg bg-emerald-500 text-slate-950 py-2 text-sm font-semibold hover:bg-emerald-400"
            >
              Buy now
            </button>
          </div>

          <div className="mt-4">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-emerald-400"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
