import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product._id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    e.preventDefault(); // prevent navigation when clicking heart
    toggleWishlist(product);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
      <Link
        to={`/product/${product._id}`}
        className="relative h-40 bg-slate-800 flex items-center justify-center block"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <button
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 text-lg leading-none px-2 py-1 rounded-full bg-slate-900/70 hover:bg-slate-900"
        >
          <span className={inWishlist ? "text-red-400" : "text-slate-200"}>
            {inWishlist ? "♥" : "♡"}
          </span>
        </button>
      </Link>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-base hover:text-emerald-400">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-400 flex-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-emerald-400">
            ₹{product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="text-xs px-3 py-1 rounded-full border border-emerald-500 hover:bg-emerald-500 hover:text-slate-950 transition"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
