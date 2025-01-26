const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["buy", "sell"], required: true }, 
  amount: { type: Number, required: true },
  amountRemaining: { type: Number, required: true }, 
  ApprovedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, required: true }, 
  status: { type: String, enum: ["open", "matched", "completed", "pending"], default: "open" }, 
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model("Order", orderSchema);
