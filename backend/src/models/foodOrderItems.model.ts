import { model, Schema, Types } from "mongoose";

const foodOrderItem = new Schema({
  food: { type: Types.ObjectId, ref: "Food" },
  quantity: Number,
});

export const FoodOrderItem = model("FoodOrderItem", foodOrderItem);
