import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Order placed successfully 🎉</h1>
      <p className="text-sm text-slate-300 mb-6">
        Thank you for shopping with DailyShop. Your order has been received and
        is being processed.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400"
        >
          Continue shopping
        </Link>
        <Link
          to="/cart"
          className="px-4 py-2 rounded-lg border border-slate-700 text-sm hover:bg-slate-900"
        >
          View cart
        </Link>
      </div>
    </main>
  );
};

export default OrderSuccess;
