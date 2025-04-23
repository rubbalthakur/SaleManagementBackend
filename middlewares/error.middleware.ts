import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
};
