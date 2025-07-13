import { model, Schema, Types } from "mongoose";

const food = new Schema({
  foodName: String,
  price: Number,
  image: String,
  ingredients: [String],
  category: { type: Types.ObjectId, ref: "Category", required: true },
  createdAt: Date,
  updatedAt: Date,
});

export const Food = model("Food", food);
