import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">
            D
          </span>
          <span className="font-semibold text-lg">DailyShop</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-emerald-400 ${isActive ? "text-emerald-400" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-emerald-400 flex items-center gap-1 ${
                isActive ? "text-emerald-400" : ""
              }`
            }
          >
            Cart
            {cartItems.length > 0 && (
              <span className="text-xs bg-emerald-500 text-slate-900 px-2 rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `hover:text-emerald-400 flex items-center gap-1 ${
                isActive ? "text-emerald-400" : ""
              }`
            }
          >
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="text-xs bg-emerald-500 text-slate-900 px-2 rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  `text-xs sm:text-sm hover:text-emerald-400 ${
                    isActive ? "text-emerald-400" : "text-slate-300"
                  }`
                }
              >
                Hi, {user.name}
              </NavLink>
              <button
                onClick={logout}
                className="text-xs sm:text-sm border border-slate-700 px-3 py-1 rounded-lg hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-emerald-400 ${
                    isActive ? "text-emerald-400" : ""
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-emerald-400 ${
                    isActive ? "text-emerald-400" : ""
                  }`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
