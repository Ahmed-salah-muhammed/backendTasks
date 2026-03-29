import express from "express";
import todoRouter from "./Router/todoRouter.js";

const app = express();

app.use(express.json());

app.use("/api/todos", todoRouter);

export default app;
