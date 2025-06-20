import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const order = new Schema({
  user: String,
  totalPrice: Number,
  foodOrderItems: [
    {
      foodName: String,
      price: Number,
      quantity: Number,
      ingredients: String,
    },
  ],
  status: String,
});

export const Order = model("Order", order);
