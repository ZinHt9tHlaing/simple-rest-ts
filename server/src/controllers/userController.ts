import { Request, Response } from "express";
import { User } from "../models/user";
import generatedToken from "../utils/generateToken";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types/authType";

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

        const { _id, username, email } = existingUser.toObject();

        res.status(200).json({
          success: true,
          message: "User logged in successfully.",
          user: { _id, username, email },
        });
      }
    } catch (error) {
      const err = error as Error;
      console.log("error", err);
      res.status(500).json({ error: true, message: err.message });
    }
  }
);

export const logoutController = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "User logged out." });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

export const getUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    console.log("user", req.user);
    const currentUser = {
      _id: req.user?._id,
      username: req.user?.username,
      email: req.user?.email,
    };
    res
      .status(200)
      .json({ success: true, message: "User Profile", currentUser });
  }
);

export const updateUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { username, email, newPassword } = req.body;

    const existingUser = await User.findById(req.user?._id);

    if (!existingUser) {
      res.status(404);
      throw new Error("User not found");
    }

    existingUser.username = username || existingUser.username;
    existingUser.email = email || existingUser.email;
    existingUser.password = newPassword || existingUser.password;

    const updatedUser = await existingUser.save();

    const selectedUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    };

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: selectedUser,
    });
  }
);
