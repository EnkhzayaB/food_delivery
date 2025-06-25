import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const refresh = async (req: Request, res: Response) => {
  res.send("refresh d deer post huslee irlee");
};
export const signIn = async (req: Request, res: Response) => {
  res.send("signin d deer post huslee irlee");
};

export const singUp = async (req: Request, res: Response) => {
  res.send("signup d deer post huslee irlee");
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
