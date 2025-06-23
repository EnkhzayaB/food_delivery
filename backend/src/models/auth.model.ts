import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const user = new Schema({
  email: { type: String, required: true },
  passport: String,
  phoneNumber: Number,
  address: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", user);
