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

// {
//     "email": "zayacom",
//     "password": "password123",
//     "phoneNumber": "1234567890",
//     "address": "Ulaanbaatar, Mongolia",
//     "role": "USER"
//   }
