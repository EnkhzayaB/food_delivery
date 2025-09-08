import { timeStamp } from "console";
import { model, Schema, Types } from "mongoose";

const order = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  foodOrderItems: [{ type: Types.ObjectId, ref: "FoodOrderItem" }],
  totalPrice: { type: Number, required: true },
  deliveryAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "DELIVERED", "CANCELLED"],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = model("Order", order);
