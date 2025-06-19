import { Request, Response } from "express";
import { Category } from "../models/index.js";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(303).json({ success: false, error: error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = req.body;
    const createCategory = await Category.create(category);

    res.json({ success: true, data: createCategory });
  } catch (error) {
    res.status(402).json({ success: false, error: error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const updateCategory = req.body;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      updateCategory,
      {
        new: true,
      }
    );
    res.status(202).json({ success: true, data: category });
  } catch (error) {
    res.status(403).json({ success: true, error: error });
  }
};

export const deleteCategory = (req: Request, res: Response) => {
  res.json("deleteFoodCategory deer delete huselt irlee");
};
