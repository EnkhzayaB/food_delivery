import mongoose from "mongoose";
import { model, Schema, Types } from "mongoose";

const category = new Schema({
  categoryName: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Category = model("Category", category);
