import { model, Schema, Types } from "mongoose";

const order = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  foodOrderItems: [{ type: Types.ObjectId, ref: "FoodOrderItem" }],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PENDING", "DELIVERED", "CANCELED"],
    default: "PENDING",
  },
});

export const Order = model("Order", order);
