import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrder,
  getUserOrders,
  updateOrderStatus,
  bulkUpdateOrderStatus,
} from "../controllers/order.controller.js";
const orderRouter = express.Router();

orderRouter.get("/", getAllOrders); // Admin-д зориулсан - бүх захиалга
orderRouter.get("/user", getUserOrders); // Тухайн хэрэглэгчийн захиалга
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
orderRouter.put("/bulk-update", bulkUpdateOrderStatus); // Bulk update order status
orderRouter.put("/:id", updateOrderStatus); // Update order status

export default orderRouter;
