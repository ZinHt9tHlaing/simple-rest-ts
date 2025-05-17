import express from "express";
import {
  createNewTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController";

const router = express.Router();

router.post("/create", createNewTodo);

router.get("/todos", getTodos);

router.route("/todo/:id").get(getSingleTodo).put(updateTodo).delete(deleteTodo);

export default router;
