import { Request, Response } from "express";
import { Todo } from "../models/todo";
import { AuthRequest } from "../types/authType";

export const createNewTodo = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const userId = req.user?._id

  try {
    const todo = await Todo.create({
      title,
      userId,
    });
    res.status(201).json({ success: true, message: "New todo added.", todo });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res
      .status(200)
      .json({ success: true, message: "All todos fetched.", todos });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

export const getSingleTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    res
      .status(200)
      .json({ success: true, message: "Single todo fetched.", todo });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Todo has been updated.",
      updatedTodo,
    });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Todo has been deleted." });
  } catch (error) {
    const err = error as Error;
    console.log("error", err);
    res.status(500).json({ error: true, message: err.message });
  }
};
