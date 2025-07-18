import express from "express";
import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryPage,
} from "../controllers/category.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.patch("/:categoryId", updateCategory);
// categoryRouter.delete("/:categoryId", deleteCategory);
