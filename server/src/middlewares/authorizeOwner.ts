import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../types/authType";
import { User } from "../models/user";
import { Todo } from "../models/todo";

const authorizeOwner = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    if (todo.userId?.toString() !== req.user?._id.toString()) {
      res.status(403);
      throw new Error("You are not authorized to perform this action");
    }
    next();
  }
);

export { authorizeOwner };
