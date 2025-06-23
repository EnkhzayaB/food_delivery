import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const auth = new Schema({
  email: String,
  passport: String,
  phoneNumber: Number,
address: String,
role: String,
isVerified: String,
createdAt: Date,
updatedAt: Date
});

export const Auth = model("Auth", auth);
