import { model, Schema } from "mongoose";

const user = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: Number,
  address: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", user);
