import express from "express";
import {
  refresh,
  signIn,
  singUp,
  rePasswordRequest,
  verifyRePasswordReq,
  rePassword,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/refresh", refresh);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-up", singUp);
authRouter.post("/reset-password-request", rePasswordRequest);
authRouter.get("/verify-reset-password-request", verifyRePasswordReq);
authRouter.post("/reset-password", rePassword);

export default authRouter;
