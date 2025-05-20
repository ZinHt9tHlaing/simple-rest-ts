import { Request, Response } from "express";
import { User } from "../models/user";
import generatedToken from "../utils/generateToken";
import asyncHandler from "../utils/asyncHandler";

export const registerController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: true, message: "User already exists." });
    }

    const user = await User.create({ username, email, password });

    res
      .status(201)
      .json({ success: true, message: "User registered successfully.", user });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res
          .status(400)
          .json({ error: true, message: "Please provide credentials." });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        res.status(404).json({ error: true, message: "User not found." });
      }

      if (existingUser && (await existingUser.matchPassword(password))) {
        generatedToken(res, existingUser._id);

        res.status(200).json({
          success: true,
          message: "User logged in successfully.",
          user: existingUser,
        });
      }
    } catch (error) {
      const err = error as Error;
      console.log("error", err);
      res.status(500).json({ error: true, message: err.message });
    }
  }
);
