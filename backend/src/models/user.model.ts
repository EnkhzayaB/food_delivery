import { model, Schema } from "mongoose";

const user = new Schema({
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password is required only if not a Google user
    },
  },
  name: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  picture: { type: String },
  phoneNumber: Number,
  address: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  isVerified: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", user);
