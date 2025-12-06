import React, { useEffect, useState } from "react";
import { api } from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/products")
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Daily use products, in one place
        </h1>
        <p className="text-sm text-slate-400">
          Mugs, bottles, notebooks and more – a simple demo store built with
          MERN and Tailwind.
        </p>
      </section>

      {loading ? (
        <p className="text-sm text-slate-400">Loading products...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
