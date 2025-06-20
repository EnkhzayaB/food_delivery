import express from "express";
import mongoose from "mongoose";
import foodsRouter from "./routes/food.route.js";
import orderRouter from "./routes/order.route.js";
import CategoryRouter from "./routes/foodCategory.route.js";
import authRouter from "./routes/auth.route.js";

mongoose.connect(
  "mongodb+srv://Enkhzayabymba559:Gk9axxWzEYDZbH2r@cluster0.85nbryh.mongodb.net/"
);

const server = express();
server.use(express.json());

const port = 3000;

server.use("/food", foodsRouter);
server.use("/order", orderRouter);
server.use("/food-category", CategoryRouter);
server.use("/auth", authRouter);

server.get("/", (_request, response) => {
  response.send("Hello zaya");
});

server.listen(port, () => {
  console.log("Server aslaa");
});
