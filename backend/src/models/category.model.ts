import mongoose from "mongoose";
import { model, Schema, Types } from "mongoose";

const category = new Schema({
  category: String,
  image: String,
  food: { type: Types.ObjectId, ref: "Food", required: true },
  createdAt: Date,
  updatedAt: Date,
});

export const Category = model("Category", category);
