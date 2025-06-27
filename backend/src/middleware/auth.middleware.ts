import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const verifyToken = (request: any, res: Response, next: any) => {
  const token = request.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded: any = jwt.verify(token, "zaya-123-test");
    request.userId = decoded.userId as string;
    next();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export default verifyToken;
