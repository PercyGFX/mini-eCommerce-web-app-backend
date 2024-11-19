import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
dotenv.config();

export const ValidateAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid authorization format" });
    }

    const token = authHeader.split(" ")[1];

    if (token !== process.env.API_KEY) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Authorization failed" });
  }
};
