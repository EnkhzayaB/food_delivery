import { Request, Response } from "express";
import { Food } from "../models/index.js";

export const getAllFoods = async (_request: Request, response: Response) => {
  try {
    const foods = await Food.find().populate("category");
        response.json({ success: true, data: foods });
  } catch (error) {
        response.status(500).json({ success: false, error: error });
  }
};

export const getCategoryPage = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;

    const foods = await Food.find().populate({
      path: "category",
      match: { categoryName: categoryName },
    });

    const filteredFoods = foods.filter((food) => food.category !== null);

        res.json({ success: true, data: filteredFoods });
  } catch (error) {
        res.status(500).json({ success: false, error: error });
  }
};

export const getFoodByid = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const food = await Food.findById(foodId).populate("category");

    response.status(200).json({ success: true, data: food });
  } catch (error) {
    response.status(500).json({ success: false, error: error });
  }
};

export const createFood = async (request: Request, response: Response) => {
  try {
    const { foodName, price, image, ingredients, category } = request.body;
    const createFood = await Food.create({
      foodName,
      price,
      image,
      ingredients,
      category,
    });

    response.json({ success: true, data: createFood });
  } catch (error) {
    response.status(500).json({ success: false, error: error });
  }
};

export const updateFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const updateFood = request.body;

    const food = await Food.findByIdAndUpdate(foodId, updateFood, {
      new: true,
    });
    response.status(200).json({ success: true, data: food });
  } catch (error) {
    response.status(500).json({ success: false, error: error });
  }
};

export const deleteFood = async (request: Request, response: Response) => {
  try {
    const { foodId } = request.params;
    const deleteFood = await Food.findByIdAndDelete(foodId);
    if (!deleteFood) {
      console.error("Error finding food");
      return response
        .status(404)
        .json({ success: false, error: "Failed to find food" });
    }

    return response.json({
      success: true,
      deletedData: deleteFood,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    response
      .status(400)
      .json({ success: false, error: "Failed to delete food" });
  }
};

// {
//   "foodName": "Dill Salad ",
//   "price": 13000,
//   "image": "https://    res.cloudinary.com/dvop0mkqf/image/upload/v1752446844/yiqtn0vm0fr5w9iwlkth.jpg",
//   "ingredients": "lettuce, bacon, egg, chicken, cheese",
//   "category": "68741b87132d4b669a284836"
// }
