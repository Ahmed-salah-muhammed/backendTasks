import express from "express";
import {
  getAllTodos,
  getTodo,
  patchTodo,
  putTodo,
  deleteTodo,
  postTodo,
} from "./../controllers/todoController.js";

const router = express.Router();

router.route("/").get(getAllTodos).post(postTodo);
router
  .route("/:id")
  .get(getTodo)
  .patch(patchTodo)
  .put(putTodo)
  .delete(deleteTodo);

export default router;
