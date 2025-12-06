import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

const Cart = () => {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();

const handleBuyNow = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  if (!items.length) return;

  navigate("/checkout"); // 👈 go to new checkout page
};


  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your cart</h1>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">
          Your cart is empty. Add something from the home page.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-slate-400">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <div className="text-sm font-semibold mr-3">
                  ₹{item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-xs px-2 py-1 rounded-lg border border-slate-700 hover:bg-slate-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 h-fit">
            <h2 className="text-lg font-semibold mb-3">Summary</h2>
            <div className="flex items-center justify-between text-sm mb-4">
              <span>Total</span>
              <span className="font-bold text-emerald-400">₹{totalPrice}</span>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full rounded-lg bg-emerald-500 text-slate-950 py-2 text-sm font-semibold hover:bg-emerald-400"
            >
              Buy now
            </button>
            <p className="text-[11px] text-slate-500 mt-2">
              This is a demo store – clicking buy will just create an order in
              MongoDB, no real payment.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
