import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const order = new Schema({
  user: String,
  totalPrice: Number,
  foodOrderItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: String,
  ingredients: String,
  date: Number,
});

export const Order = model("Order", order);
