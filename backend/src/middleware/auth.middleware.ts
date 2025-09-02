import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "zaya123";

const verifyToken = (request: any, res: Response, next: any) => {
  const token = request.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    request.userId = decoded.userId as string;
    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Auth middleware that checks for valid token
export const authMiddleware = (req: any, res: Response, next: any) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied, token required" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id and role
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Admin middleware that checks if user is admin
export const adminMiddleware = (req: any, res: Response, next: any) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

export default verifyToken;
