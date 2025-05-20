import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generatedToken = (res: Response, userId: Types.ObjectId) => {
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generatedToken;
