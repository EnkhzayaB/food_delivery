import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const food = new Schema({
  foodname: String,
  price: Number,
  image: String,
  ingredients: [String],
  createdAt: Date,
  updatedAt: Date,
});

export const Food = model("Food", food);
