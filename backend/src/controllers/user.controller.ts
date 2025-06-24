import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const refresh = async (req: Request, res: Response) => {
  res.send("refresh d deer post huslee irlee");
};
export const signIn = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.status(200).json({
          success: true,
          message: "Authenticated",
        });
      } else {
        res.status(200).json({
          success: false,
          message: "not authenticated",
        });
      }
    });
  } catch (error) {
    res.status(444).json({
      success: false,
      error: error,
    });
  }
};

export const singUp = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    bcrypt.hash(password, salt, async (error, hash) => {
      const createdUser = await User.create({
        name: name,
        password: hash,
      });

      res.status(200).json({
        success: true,
        data: createdUser,
      });
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
    });
  }
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
