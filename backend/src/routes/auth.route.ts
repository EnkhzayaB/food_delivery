import express from "express";
import { signIn, signUp } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/log-in", signIn);
authRouter.post("/", signUp);
