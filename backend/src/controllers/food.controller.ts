import { Request, Response } from "express";
import { Food } from "../models/index.js";
import { request } from "http";

export const getAllFoods = async (request: Request, response: Response) => {
  try {
    const foods = await Food.find();
    response.json({ success: true, data: foods });
  } catch (error) {
    response.status(303).json({ success: false, error: error });
  }
};

export const getFoodByid = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const food = await Food.findById(foodId);

    response.status(202).json({ success: true, data: food });
  } catch (error) {
    response.status(402).json({ success: true, error: error });
  }
};

export const createFood = async (request: Request, response: Response) => {
  try {
    const food = request.body;
    const createFood = await Food.create(food);

    response.json({ success: true, data: createFood });
  } catch (error) {
    response.status(402).json({ success: false, error: error });
  }
};

export const updateFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const updateFood = request.body;

    const food = await Food.findByIdAndUpdate(foodId, updateFood, {
      new: true,
    });
    response.status(202).json({ success: true, data: food });
  } catch (error) {
    response.status(403).json({ success: true, error: error });
  }
};

export const deleteFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const deleteFood = request.body;

    const food = await Food.findByIdAndDelete(foodId, deleteFood);
    response.status(202).json({ success: true, data: food });
  } catch (error) {
    response.status(202).json({ success: true, error: error });
  }
};
