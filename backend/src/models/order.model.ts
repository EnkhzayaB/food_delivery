import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const order = new Schema({
  foodname: String,
  price: Number,
  image: String,
  ingredients: String,
  createdAt: Date,
  updatedAt: Date,
});

export const Order = model("Order", order);
