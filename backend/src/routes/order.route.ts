import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:orderId", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.patch("/:orderId", updateOrder);
orderRouter.delete("/:orderId", deleteOrder);

export default orderRouter;
