import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const category = new Schema({
  foodCategory: String,
  image: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Category = model("Category", category);
