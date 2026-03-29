import express from "express";
// import morgan from "morgan";
import todoRouter from "./Router/todoRouter.js";
// import port from ".env";

const app = express();

// app.use(morgan("dev")); //---> this is middleware that can display the test in the terminal

app.use(express.json());

// // GET
// app.get("/api/v1/todos", getAllTodos);

// // POST
// app.post("/api/v1/todos", postTodo);

// // PUT
// app.put("/api/v1/todos", putTodo);

// Router
app.use("/api/v1/todos", todoRouter);

// using route
// todoRouter.route("/").get(getAllTodos).post(postTodo).put(putTodo);

// // PATCH
// app.patch("/api/v1/todos/:id", patchTodo);

// // GET specific data by id
// app.get("/api/v1/todos/:id", getTodo);

// // DELETE
// app.delete("/api/v1/todos/:id", deleteTodo);

// using route
// todoRouter.route("/:id").get(getTodo).patch(patchTodo).delete(deleteTodo);

export default app;
