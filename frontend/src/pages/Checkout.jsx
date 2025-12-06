import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    contactNumber: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If not logged in or no items -> redirect back
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!items.length) {
      navigate("/cart");
    }
  }, [user, items.length, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);

      const orderItems = items.map((item) => ({
        productId: item._id,
        quantity: item.quantity
      }));

      const shippingAddress = {
        fullName: form.fullName,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode
      };

      await api.post(
        "/api/orders",
        {
          items: orderItems,
          totalPrice,
          shippingAddress,
          contactNumber: form.contactNumber
        },
        token
      );

      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        {/* Address form */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h2 className="text-lg font-semibold mb-3">Shipping details</h2>

          {error && (
            <p className="text-xs text-red-400 mb-3 text-center">{error}</p>
          )}

          <form className="space-y-3" onSubmit={onSubmit}>
            <div>
              <label className="block text-xs mb-1">Full name</label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={onChange}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Address line 1</label>
              <input
                type="text"
                name="addressLine1"
                required
                value={form.addressLine1}
                onChange={onChange}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Address line 2 (optional)</label>
              <input
                type="text"
                name="addressLine2"
                value={form.addressLine2}
                onChange={onChange}
                className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={onChange}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={form.state}
                  onChange={onChange}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1">Postal code</label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={form.postalCode}
                  onChange={onChange}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Contact number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  value={form.contactNumber}
                  onChange={onChange}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 rounded-lg bg-emerald-500 text-slate-950 py-2 text-sm font-semibold hover:bg-emerald-400 disabled:opacity-60"
            >
              {submitting ? "Placing order..." : "Place order"}
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-fit">
          <h2 className="text-lg font-semibold mb-3">Order summary</h2>
          <div className="space-y-2 mb-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-xs">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span>Total</span>
            <span className="font-bold text-emerald-400">₹{totalPrice}</span>
          </div>

          <p className="text-[11px] text-slate-500 mt-3">
            This is a demo store – no real payments are processed.
          </p>

          <Link
            to="/cart"
            className="inline-block text-xs text-emerald-400 mt-3 hover:underline"
          >
            ← Back to cart
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
