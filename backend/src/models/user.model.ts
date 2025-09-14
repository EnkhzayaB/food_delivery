import { model, Schema } from "mongoose";

const user = new Schema({
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
  },
  name: { type: String },
  phoneNumber: Number,
  address: String,
  createdAt: Date,
  updatedAt: Date,
});

export const User = model("User", user);
