import express from "express";
import {
  getAllTodos,
  getTodo,
  putTodo,
  deleteTodo,
  postTodo,
} from "./../controllers/todoController.js";

const router = express.Router();

router.route("/").get(getAllTodos).post(postTodo);
router.route("/:id").get(getTodo).put(putTodo).delete(deleteTodo);

export default router;
