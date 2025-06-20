import { Request, Response } from "express";
import { Order } from "../models/order.model.js";

const calculateTotalPrice = (order: any) => {
  let total = 0;
  const items = order.foodOrderItems || [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    total += item.price * item.quantity;
  }

  return total;
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(303).json({ success: false, error: error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(402).json({ success: true, error: error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const createOrder = await Order.create(order);

    res.json({ success: true, data: createOrder });
  } catch (error) {
    res.status(402).json({ success: false, error: error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updateOrder = req.body;

    const order = await Order.findByIdAndUpdate(orderId, updateOrder, {
      new: true,
    });
    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(403).json({ success: true, error: error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const deleteOrder = req.body;

    const order = await Order.findByIdAndDelete(orderId, deleteOrder);
    res.status(202).json({ success: true, data: order });
  } catch (error) {
    res.status(202).json({ success: true, error: error });
  }
};
