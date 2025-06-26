import jwt from "jsonwebtoken";
import { Request, response, Response } from "express";

const verifyToken = (request: Request, res: Response, next: any) => {
  const token = request.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "zaya-123-test");
    request.userId = decoded.userId;
    next();
  } catch (error) {
    response.status(400).json({ error: error });
  }
};

export default verifyToken;
