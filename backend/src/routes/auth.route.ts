import express from "express";
import { signIn, signUp, createAdmin } from "../controllers/auth.controller";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware";

export const authRouter = express.Router();

authRouter.post("/log-in", signIn);
authRouter.post("/", signUp);
// Only admins can create other admins
authRouter.post("/create-admin", authMiddleware, adminMiddleware, createAdmin);
