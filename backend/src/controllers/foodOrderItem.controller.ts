import { Request, Response } from "express";
import { FoodOrderItem } from "../models/foodOrderItems.model.js";

export const createFoodOrderItem = async (req: Request, res: Response) => {
  try {
    const newItem = await FoodOrderItem.create(req.body);
    res
      .status(201)
      .json({ ...newItem, createdAt: new Date(), updatedAt: new Date() });
  } catch (error) {
    res.status(400).json("aldaa");
  }
};

export const getAllFoodOrderItems = async (
  _request: Request,
  response: Response
) => {
  try {
    const items = await FoodOrderItem.find().populate("food");
    response.status(200).json(items);
  } catch (error) {
    response.status(500).json("aldaa");
  }
};

export const getFoodOrderItemById = async (req: Request, res: Response) => {
  try {
    const item = await FoodOrderItem.findById(req.params.id).populate("food");
    res.json(item);
  } catch (error) {
    res.status(500).json("aldaa");
  }
};

export const updateFoodOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateItem = req.body;

    const item = await FoodOrderItem.findByIdAndUpdate(id, updateItem, {
      new: true,
    });
    res.status(202).json({ success: true, data: item });
  } catch (error) {
    res.status(403).json({ success: true, error: error });
  }
};

export const deleteFoodOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteFoodOrderItem = req.body;

    const item = await FoodOrderItem.findByIdAndDelete(id, deleteFoodOrderItem);
    res.status(202).json({ success: true, data: item });
  } catch (error) {
    res.status(202).json({ success: true, error: error });
  }
};

// {
//     "food": "685c5451f012563f0ece9c6a",
//     "quantity": 2
//   }
