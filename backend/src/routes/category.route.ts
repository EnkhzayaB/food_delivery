import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const CategoryRouter = express.Router();

CategoryRouter.get("/", getCategory);
CategoryRouter.post("/", createCategory);
CategoryRouter.patch("/:categoryId", updateCategory);
CategoryRouter.delete("/:categoryId", deleteCategory);

export default CategoryRouter;
