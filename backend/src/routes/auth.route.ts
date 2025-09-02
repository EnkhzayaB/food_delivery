import express from "express";
import { signIn, signUp, createAdmin } from "../controllers/auth.controller.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/log-in", signIn);
authRouter.post("/", signUp);
// Only admins can create other admins
authRouter.post("/create-admin", authMiddleware, adminMiddleware, createAdmin);
