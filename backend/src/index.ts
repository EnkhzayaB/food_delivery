import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import foodsRouter from "./routes/food.route.js";
import orderRouter from "./routes/order.route.js";
import { categoryRouter } from "./routes/category.route.js";
import { foodOrderItemRouter } from "./routes/foodOrderItems.route.js";
import { authRouter } from "./routes/auth.route.js";
dotenv.config();

mongoose.connect((process.env.MONGO_URL as string) || "");

const server = express();
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

const port = process.env.PORT || "";

server.use("/food", foodsRouter);
server.use("/order", orderRouter);
server.use("/category", categoryRouter);
server.use("/items", foodOrderItemRouter);
server.use("/auth", authRouter);

server.get("/", (_request, response) => {
  response.send("Hello zaya");
});

server.listen(port, () => {
  console.log(`Server aslaa ${port}`);
});
