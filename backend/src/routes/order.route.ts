import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
orderRouter.put("/:orderId", updateOrder);

export default orderRouter;
