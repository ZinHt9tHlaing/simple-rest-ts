import { Request, Response } from "express";
import { Todo } from "../models/todo";

export const createNewTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const todo = await Todo.create({
      title,
    });
    res
      .status(201)
      .json({ success: true, message: "New todo added.", data: todo });
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
      .json({ success: true, message: "All todos fetched.", data: todos });
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
      .json({ success: true, message: "Single todo fetched.", data: todo });
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
      data: updatedTodo,
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
