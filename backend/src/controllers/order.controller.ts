import { Request, Response } from "express";
import { Order } from "../models/order.model.js";
import { FoodOrderItem } from "../models/foodOrderItems.model.js";
import { log } from "console";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user, foodOrderItems, totalPrice, deliveryAddress } = req.body;

    // ehleed FoodOrderItemuudee uusgn //
    const itemsIds = await Promise.all(
      foodOrderItems.map(async (item: any) => {
        const foodOrderItem = await FoodOrderItem.create({
          food: item.food,
          quantity: item.quantity,
        });
        return foodOrderItem._id;
      })
    );

    //Order uusgn//
    const order = await Order.create({
      user: user,
      foodOrderItems: itemsIds,
      totalPrice: totalPrice,
      deliveryAddress: deliveryAddress,
      status: "PENDING",
    });

    res.status(202).json({
      success: true,
      message: "zahialga amjilttai uuslee",
      data: order,
    });
  } catch (error) {
    console.log("order uusgehd aldaa garlaa:", error);
    res
      .status(400)
      .json({ success: false, message: "zahialga uusgehed aldaa garlaa" });
  }
};

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
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const getUserOrders = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // JWT token-оос авсан user ID

    const orders = await Order.find({ user: userId })
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: {
          path: "food",
          model: "Food",
        },
      })
      .sort({ createdAt: -1 }); // Хамгийн шинийг эхэнд

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
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
    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json("aldaa");
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["PENDING", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be PENDING, DELIVERED, or CANCELLED",
      });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true })
      .populate("user")
      .populate({
        path: "foodOrderItems",
        populate: {
          path: "food",
          model: "Food",
        },
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

// {"user": "6858f722e2ca28c9f065da78",
// "foodOrderItems": ["685c5451f012563f0ece9c6a", "685c58b7ded25782b44f88c9"],
// "totalPrice": 27000,
// "status": "pending"
// }
