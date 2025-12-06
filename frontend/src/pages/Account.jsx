import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../services/api.js";

const Account = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    setLoadingOrders(true);
    api
      .get("/api/orders/my", token)
      .then((data) => {
        setOrders(data);
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Failed to load orders");
      })
      .finally(() => setLoadingOrders(false));
  }, [token]);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your account</h1>

      {/* User info */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-6">
        <h2 className="text-lg font-semibold mb-3">Profile</h2>
        <p className="text-sm">
          <span className="text-slate-400 mr-2">Name:</span>
          {user?.name}
        </p>
        <p className="text-sm mt-1">
          <span className="text-slate-400 mr-2">Email:</span>
          {user?.email}
        </p>
      </section>

      {/* Orders */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-3">Your orders</h2>

        {loadingOrders ? (
          <p className="text-sm text-slate-400">Loading orders...</p>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-slate-400">
            You haven&apos;t placed any orders yet.
          </p>
        ) : (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-slate-700 rounded-xl p-3 text-sm"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    ₹{order.totalPrice}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-1">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </p>

                <div className="mt-2 mb-2">
                  <p className="text-xs text-slate-400 mb-1">Items:</p>
                  <ul className="text-xs list-disc ml-4 space-y-1">
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.product?.name || "Product"} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-2">
                  <p className="text-xs text-slate-400 mb-1">Shipping to:</p>
                  <p className="text-xs">
                    {order.shippingAddress?.fullName}
                    <br />
                    {order.shippingAddress?.addressLine1}
                    {order.shippingAddress?.addressLine2 && (
                      <>
                        <br />
                        {order.shippingAddress?.addressLine2}
                      </>
                    )}
                    <br />
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}{" "}
                    {order.shippingAddress?.postalCode}
                    <br />
                    Phone: {order.contactNumber}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Account;
