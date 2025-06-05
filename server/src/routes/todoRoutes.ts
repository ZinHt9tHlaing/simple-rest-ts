import express from "express";
import {
  createNewTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController";
import { authHandler } from "../middlewares/authHandler";

const router = express.Router();

router.post("/create", authHandler, createNewTodo);

router.get("/todos", getTodos);

router.route("/todo/:id").get(getSingleTodo).put(updateTodo).delete(deleteTodo);

export default router;
