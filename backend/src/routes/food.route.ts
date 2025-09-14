import express from "express";
import {
  getAllFoods,
  getFoodByid,
  createFood,
  updateFood,
  deleteFood,
  getCategoryPage,
} from "../controllers/food.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const foodsRouter = express.Router();

foodsRouter.get("/", getAllFoods);
foodsRouter.get("/category/:categoryName", getCategoryPage);
foodsRouter.post("/", createFood);
foodsRouter.put("/:foodId", updateFood);
foodsRouter.delete("/:foodId", deleteFood);
foodsRouter.get("/:foodId", getFoodByid);

export default foodsRouter;
