import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      api
        .get("/api/auth/me", token)
        .then((data) => setUser(data))
        .catch(() => {
          setUser(null);
          setToken("");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        });
    }
  }, []); // run once

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.post("/api/auth/login", { email, password });
      const userData = { _id: data._id, name: data.name, email: data.email };
      setUser(userData);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await api.post("/api/auth/register", {
        name,
        email,
        password
      });
      const userData = { _id: data._id, name: data.name, email: data.email };
      setUser(userData);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = { user, token, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
