import { Request, Response } from "express";
import { Order } from "../models/order.model.js";

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: {
          path: "food",
          model: "Food",
        },
      });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json("aldaa");
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: {
          path: "food",
          model: "Food",
        },
      });
    res.json(order);
  } catch (error) {
    res.status(500).json("aldaa");
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json("order deer aldaa garlaa");
  }
};

// export const updateOrder = async (request: Request, response: Response) => {
//   try {
//     const { orderId } = request.params;
//     const updateOrder = request.body;

//     const order = await Order.findByIdAndUpdate(orderId, updateOrder, {
//       new: true,
//     });
//     response.status(202).json({ success: true, data: order });
//   } catch (error) {
//     response.status(403).json({ success: true, error: error });
//   }
// };

// {"user": "6858f722e2ca28c9f065da78",
// "foodOrderItems": ["685c5451f012563f0ece9c6a", "685c58b7ded25782b44f88c9"],
// "totalPrice": 27000,
// "status": "pending"
// }
