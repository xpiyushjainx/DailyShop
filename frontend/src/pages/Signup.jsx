import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-1 text-center">
          Create account
        </h2>
        <p className="text-xs text-slate-400 mb-4 text-center">
          Sign up and start shopping.
        </p>

        {error && (
          <p className="text-xs text-red-400 mb-3 text-center">{error}</p>
        )}

        <form className="space-y-3" onSubmit={onSubmit}>
          <div>
            <label className="block text-xs mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={onChange}
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-emerald-500 text-slate-950 py-2 text-sm font-semibold hover:bg-emerald-400 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
