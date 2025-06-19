import { Request, Response } from "express";
import { Order } from "../models/order.model.js";

export const getAllFoodOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(303).json({ success: false, error: error });
  }
};

export const getFoodOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(402).json({ success: true, error: error });
  }
};

export const createFoodOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const createFoodOrder = await Order.create(order);

    res.json({ success: true, data: createFoodOrder });
  } catch (error) {
    res.status(402).json({ success: false, error: error });
  }
};

export const updateFoodOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updateFoodOrder = req.body;

    const order = await Order.findByIdAndUpdate(orderId, updateFoodOrder, {
      new: true,
    });
    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(403).json({ success: true, error: error });
  }
};

export const deleteFoodOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const deleteFoodOrder = req.body;

    const order = await Order.findByIdAndDelete(orderId, deleteFoodOrder);
    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(202).json({ success: true, error: error });
  }
};
