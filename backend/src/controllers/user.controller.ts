import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(303).json({ success: false, error: error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(202).json({ success: true, data: user });
  } catch (error) {
    res.status(402).json({ success: true, error: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateUser = req.body;

    const user = await User.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });
    res.status(202).json({ success: true, data: user });
  } catch (error) {
    res.status(403).json({ success: true, error: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deleteUser = req.body;

    const user = await User.findByIdAndDelete(userId, deleteUser);
    res.status(202).json({ success: true, data: user });
  } catch (error) {
    res.status(202).json({ success: true, error: error });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const comparedPassword = bcrypt.compare(password, user?.password || "");

    const token = jwt.sign({ userId: user?.id || "" }, "zaya-123-test", {
      expiresIn: "1h",
    });
    console.log(token);

    if (!comparedPassword) {
      res.status(200).json({
        success: false,
        message: "not authenticated",
      });
    }
    {
      res.status(200).json({
        success: true,
        message: "Authenticated",
        token: token,
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, error: error });
  }
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

// {
//     "email": "zayacom",
//     "password": "password123",
//     "phoneNumber": "1234567890",
//     "address": "Ulaanbaatar, Mongolia",
//     "role": "USER"
//   }
