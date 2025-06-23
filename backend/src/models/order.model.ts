import { model, Schema, Types } from "mongoose";
import { FoodOrderItem } from "./foodOrderItems.model.js";

const order = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  totalPrice: Number,
  foodOrderItems: [FoodOrderItem],
  status: {
    type: String,
    enum: ["pending", "delivered", "canceled"],
    default: "pending",
  },
});

export const Order = model("Order", order);

// order: [
//   {
//     user: "enkhzaya@gmail.com",
//     totalPrice: 45000,
//     foodOrderItems: [
//       {
//         food: {
//           foodname: "hawaii pizza",
//           price: 45000,
//           image: "pizza zurag",
//           ingredient: ["cheese", "ham"],
//         },
//         quantity: 2,
//       },
//       {
//         food: {
//           foodname: "salami pizza",
//           price: 20000,
//           image: "pizza zurag",
//           ingredient: ["cheese", "ham"],
//         },
//         quantity: 1,
//       },
//     ],
//   },
// ];
