import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "zaya123";

export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ isAvailable: false, message: "Email is required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.json({ isAvailable: false });
  }

  return res.json({ isAvailable: true });
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "No user found" });

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", err });
  }
};
