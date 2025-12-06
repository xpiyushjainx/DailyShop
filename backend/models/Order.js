import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: { type: Number, required: true, default: 1 }
      }
    ],
    totalPrice: { type: Number, required: true },

    // 👇 New fields
    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    contactNumber: { type: String, required: true }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
