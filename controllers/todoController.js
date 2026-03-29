import express from "express";
import fs from "fs";

const todos = JSON.parse(
  fs.readFileSync(
    new URL("../dev-data/data/todos-simple.json", import.meta.url),
    "utf-8",
  ),
);

const app = express();

app.use((req, res, next) => {
  req.requestDate = new Date().toISOString();
  next();
});

export const getAllTodos = (req, res) => {
  res.status(200).json({
    status: "success",
    requestDate: req.requestDate,
    results: todos.length,
    data: {
      todos,
    },
  });
};

export const getTodo = (req, res) => {
  console.log(req.params);

  //automatically convert this string to the number also we can use + or Number
  const id = req.params.id * 1;
  const todoIndex = todos.findIndex((el) => el.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo: todos[todoIndex],
    },
  });
};

export const patchTodo = (req, res) => {
  console.log(req.params);

  //automatically convert this string to the number also we can use + or Number
  const id = req.params.id * 1;
  const todoIndex = todos.findIndex((el) => el.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo: "content updated successfully",
    },
  });
};

export const putTodo = (req, res) => {
  console.log(req.params);

  //automatically convert this string to the number also we can use + or Number
  const id = req.params.id * 1;
  const todoIndex = todos.findIndex((el) => el.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo: "content updated successfully",
    },
  });
};

export const deleteTodo = (req, res) => {
  console.log(req.params);

  //automatically convert this string to the number also we can use + or Number
  const id = req.params.id * 1;
  const todoIndex = todos.findIndex((el) => el.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  res.status(204).json({
    status: "success",
    data: {
      todo: null,
    },
  });
};

export const postTodo = (req, res) => {
  const newId = todos[todos.length - 1].id + 1;
  const newtodo = Object.assign({ id: newId }, req.body);

  todos.push(newtodo);

  fs.writeFile(
    new URL("./dev-data/data/todos-simple.json", import.meta.url),
    JSON.stringify(todos, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: "fail",
          message: "Error writing file",
        });
      }

      res.status(201).json({
        status: "success",
        data: {
          todo: newtodo,
        },
      });
    },
  );
};
