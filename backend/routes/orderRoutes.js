import express from "express";
import { Order } from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 👉 Create order
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalPrice, shippingAddress, contactNumber } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    if (!shippingAddress || !contactNumber) {
      return res
        .status(400)
        .json({ message: "Shipping address and contact number are required" });
    }

    const order = await Order.create({
      user: req.user._id,
      items: items.map((item) => ({
        product: item.productId,
        quantity: item.quantity
      })),
      totalPrice,
      shippingAddress,
      contactNumber
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// 👉 Get current user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("GET MY ORDERS ERROR:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

export default router;
