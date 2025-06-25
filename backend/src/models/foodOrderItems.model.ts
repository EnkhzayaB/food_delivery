import { model, Schema, Types } from "mongoose";
import { Food } from "./food.model.js";

export const foodOrderItem = new Schema({
  food: { type: Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true },
});

export const FoodOrderItem = model("FoodOrderItem", foodOrderItem);
