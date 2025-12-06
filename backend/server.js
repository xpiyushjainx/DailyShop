import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
