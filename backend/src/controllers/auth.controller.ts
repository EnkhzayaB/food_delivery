import { Request, Response } from "express";
import { User } from "../models/auth.model.js";

export const refresh = async (req: Request, res: Response) => {
  res.send("refresh d deer post huslee irlee");
};
export const signIn = (req: Request, res: Response) => {
  res.send("signInAuth deer post huslee irlee");
};

export const singUp = async (req: Request, res: Response) => {
  const user = req.body;
  const createUser = await User.create(user);
  res.json(createUser);
};

export const rePasswordRequest = (req: Request, res: Response) => {
  res.send("rePasswordRequest deer post huselt irlee");
};

export const verifyRePasswordReq = (req: Request, res: Response) => {
  res.send("verifyRePasswordReqAuth deer get huselt irlee");
};

export const rePassword = (req: Request, res: Response) => {
  res.send("rePasswordAuth deer post huselt irlee");
};

// {
//       "email": "zaya@gmail.com",
//   "passport": "hdshfhdfs",
//   "phoneNumber": 89548768546,
//   "address": "fdsfgdsgfgds",
//   "role": "user",
//   "isVerified": "true"
// }
