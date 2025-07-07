import express from "express";
import {
  createFoodOrderItem,
  getAllFoodOrderItems,
  getFoodOrderItemById,
  updateFoodOrderItem,
  deleteFoodOrderItem,
} from "../controllers/foodOrderItem.controller.js";

export const foodOrderItemRouter = express.Router();

foodOrderItemRouter.post("/", createFoodOrderItem);
foodOrderItemRouter.get("/", getAllFoodOrderItems);
foodOrderItemRouter.get("/:id", getFoodOrderItemById);
foodOrderItemRouter.put("/:id", updateFoodOrderItem);
foodOrderItemRouter.delete("/:id", deleteFoodOrderItem);
