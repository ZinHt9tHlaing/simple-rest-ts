import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { Types } from "mongoose";
import { AuthRequest } from "../types/authType";

interface User {
  username: string;
  email: string;
  _id: string | Types.ObjectId;
}

const authHandler = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.token;

    if (!token) {
      res.status(401).json({ error: true, message: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      if (!decodedToken) {
        res
          .status(401)
          .json({ error: true, message: "Unauthorized, Invalid Token" });
      }

      req.user = (await User.findById(decodedToken.userId).select(
        "-password"
      )) as User;

      next();
    } catch (error) {
      const err = error as Error;
      console.log("error", err);
      res.status(500).json({ error: true, message: err.message });
    }
  }
);

export { authHandler };
