import express from "express";
import {
  createNewTodo,
  deleteTodo,
  getSingleTodo,
  getTodos,
  updateTodo,
} from "../controllers/todoController";
import { authHandler } from "../middlewares/authHandler";
import { authorizeOwner } from "../middlewares/authorizeOwner";

const router = express.Router();

router.post("/create", authHandler, createNewTodo);

router.get("/todos", getTodos);

router
  .route("/todo/:id")
  .get(getSingleTodo)
  .put(authHandler, authorizeOwner, updateTodo)
  .delete(authHandler, authorizeOwner, deleteTodo);

export default router;
