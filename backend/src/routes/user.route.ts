import express from "express";
import {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  signUp,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUser);
userRouter.get("/:userId", getUser);
userRouter.put("/:userId", updateUser);
userRouter.delete("/:userId", deleteUser);
userRouter.post("/signIn", signIn);
// userRouter.post("/signIn", verifyToken, signIn); - sign-in and up deer middleware bichihgui, hereglech bolsn hund l token ugnu
userRouter.post("/signUp", signUp);
export default userRouter;
