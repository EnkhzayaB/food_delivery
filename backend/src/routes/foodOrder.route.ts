import express from "express";
import {
  getAllFoodOrders,
  getFoodOrderById,
  createFoodOrder,
  updateFoodOrder,
  deleteFoodOrder,
} from "../controllers/foodOrder.controller.js";

const foodOrdersRouter = express.Router();

foodOrdersRouter.get("/", getAllFoodOrders);
foodOrdersRouter.get("/:orderId", getFoodOrderById);
foodOrdersRouter.post("/", createFoodOrder);
foodOrdersRouter.patch("/:orderId", updateFoodOrder);
foodOrdersRouter.delete("/:orderId", deleteFoodOrder);

export default foodOrdersRouter;
