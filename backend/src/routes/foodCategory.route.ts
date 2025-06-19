import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/foodCategory.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.get("/", getCategory);
CategoryRouter.post("/", createCategory);
CategoryRouter.patch("/:categoryId", updateCategory);
CategoryRouter.delete("/:categoryId", deleteCategory);

export default CategoryRouter;
