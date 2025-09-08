import { Request, Response } from "express";
import { Category } from "../models/index.js";
import { Food } from "../models/index.js";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = req.body;
    const createCategory = await Category.create(category);

    res.json({ success: true, data: createCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
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
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
