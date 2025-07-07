import express from "express";
import {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

export const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/:userId", getUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
