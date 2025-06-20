import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const auth = new Schema({
  categoryName: String,
  image: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Auth = model("Auth", auth);
