import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  bulkUpdateOrderStatus,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders); // Admin-д зориулсан - бүх захиалга
orderRouter.get("/user", authMiddleware, getUserOrders); // Тухайн хэрэглэгчийн захиалга
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
orderRouter.put("/bulk-update", authMiddleware, bulkUpdateOrderStatus); // Bulk update order status
orderRouter.put("/:id", authMiddleware, updateOrderStatus); // Update order status

export default orderRouter;
