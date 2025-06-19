import express from "express";
import {
  refreshAuth,
  signInAuth,
  singUpAuth,
  rePasswordRequestAuth,
  verifyRePasswordReqAuth,
  rePasswordAuth,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/refresh", refreshAuth);
authRouter.post("/sign-in", signInAuth);
authRouter.post("/sign-up", singUpAuth);
authRouter.post("/reset-password-request", rePasswordRequestAuth);
authRouter.get("/verify-reset-password-request", verifyRePasswordReqAuth);
authRouter.post("/reset-password", rePasswordAuth);

export default authRouter;
