import { Request, Response } from "express";
import { Auth } from "../models/index.js";
export const refreshAuth = async (req: Request, res: Response) => {};

export const signInAuth = (req: Request, res: Response) => {
  res.send("signInAuth deer post huslee irlee");
};

export const singUpAuth = (req: Request, res: Response) => {
  res.send("singUpAuth deer post huselt irlee");
};

export const rePasswordRequestAuth = (req: Request, res: Response) => {
  res.send("rePasswordRequest deer post huselt irlee");
};

export const verifyRePasswordReqAuth = (req: Request, res: Response) => {
  res.send("verifyRePasswordReqAuth deer get huselt irlee");
};

export const rePasswordAuth = (req: Request, res: Response) => {
  res.send("rePasswordAuth deer post huselt irlee");
};
