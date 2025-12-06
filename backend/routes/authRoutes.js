import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("REGISTER BODY FROM CLIENT:", req.body); // 👈 log what frontend sends

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 log full error on server

    // handle duplicate email nicely if Mongo throws it
    if (err.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }

    // send real message to frontend (at least while debugging)
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
