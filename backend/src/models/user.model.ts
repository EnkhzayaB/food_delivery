import { model, Schema } from "mongoose";

const user = new Schema({
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
  },
  password: { type: String, required: [true, "please write an password"] },
  phoneNumber: Number,
  address: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", user);
