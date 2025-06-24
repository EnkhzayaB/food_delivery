import express from "express";
import {
  refresh,
  signIn,
  singUp,
  rePasswordRequest,
  verifyRePasswordReq,
  rePassword,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/refresh", refresh);
userRouter.post("/sign-in", signIn);
userRouter.post("/sign-up", singUp);
userRouter.post("/reset-password-request", rePasswordRequest);
userRouter.get("/verify-reset-password-request", verifyRePasswordReq);
userRouter.post("/reset-password", rePassword);

export default userRouter;
