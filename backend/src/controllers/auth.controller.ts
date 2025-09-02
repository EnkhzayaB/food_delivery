import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "zaya123";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, adminCode } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Энэ имэйл хаягаар аль хэдийн бүртгэлтэй хэрэглэгч байна",
      });
      return;
    }

    // Admin code шалгах
    const ADMIN_SECRET_CODE =
      process.env.ADMIN_SECRET_CODE || "NOMNOM_ADMIN_2024";
    let userRole = "USER";

    if (adminCode && adminCode === ADMIN_SECRET_CODE) {
      userRole = "ADMIN";
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await User.create({
      email: email,
      password: hashedPassword,
      role: userRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({
      success: true,
      data: createdUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Бүртгэл үүсгэхэд алдаа гарлаа" });
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "No user found" });
      return;
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
      data: { email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", err });
    next(err);
  }
};

// Admin creation endpoint - only accessible by existing admins
export const createAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Check if requester is admin (this would need auth middleware)
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);
    const createdAdmin = await User.create({
      email: email,
      password: hashedPassword,
      role: "ADMIN",
    });
    res.status(200).json({
      success: true,
      data: createdAdmin,
      message: "Admin user created successfully",
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error });
  }
};
