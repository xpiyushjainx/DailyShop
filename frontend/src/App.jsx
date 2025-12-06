// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductDetails from "./pages/ProductDetails.jsx"; // 👈 new
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Account from "./pages/Account.jsx";
import Wishlist from "./pages/Wishlist.jsx";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/cart"
    element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    }
  />

  <Route
    path="/checkout"
    element={
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    }
  />

  <Route
    path="/order-success"
    element={
      <ProtectedRoute>
        <OrderSuccess />
      </ProtectedRoute>
    }
  />

  <Route
    path="/account"
    element={
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    }
  />

  <Route
    path="/wishlist"
    element={
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    }
  />

  <Route path="/product/:id" element={<ProductDetails />} />
</Routes>

    </div>
  );
};

export default App;
