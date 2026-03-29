import fs from "fs";

const todos = JSON.parse(
  fs.readFileSync(
    new URL("../dev-data/data/todos-simple.json", import.meta.url),
    "utf-8",
  ),
);

export const getAllTodos = (req, res) => {
  // Bonus: search by title using query param ?search=keyword
  const { search } = req.query;

  let result = todos;

  if (search) {
    result = todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  res.status(200).json({
    status: "success",
    results: result.length,
    data: {
      todos: result,
    },
  });
};

export const getTodo = (req, res) => {
  const id = req.params.id * 1;
  const todo = todos.find((el) => el.id === id);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const postTodo = (req, res) => {
  // title is required
  if (!req.body.title) {
    return res.status(400).json({
      status: "fail",
      message: "title is required",
    });
  }

  const newId = todos[todos.length - 1].id + 1;
  const newTodo = Object.assign({ id: newId, isCompleted: false }, req.body);

  todos.push(newTodo);

  fs.writeFile(
    new URL("../dev-data/data/todos-simple.json", import.meta.url),
    JSON.stringify(todos, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error saving todo",
        });
      }

      res.status(201).json({
        status: "success",
        data: {
          todo: newTodo,
        },
      });
    },
  );
};

export const putTodo = (req, res) => {
  const id = req.params.id * 1;
  const todoIndex = todos.findIndex((el) => el.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  // Keep existing values if fields are missing
  if (req.body.title !== undefined) todos[todoIndex].title = req.body.title;
  if (req.body.isCompleted !== undefined) todos[todoIndex].isCompleted = req.body.isCompleted;

  fs.writeFile(
    new URL("../dev-data/data/todos-simple.json", import.meta.url),
    JSON.stringify(todos, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error saving todo",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          todo: todos[todoIndex],
        },
      });
    },
  );
};

export const deleteTodo = (req, res) => {
  const id = req.params.id * 1;
  const todoIndex = todos.findIndex((el) => el.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "todo not found",
    });
  }

  todos.splice(todoIndex, 1);

  fs.writeFile(
    new URL("../dev-data/data/todos-simple.json", import.meta.url),
    JSON.stringify(todos, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error saving todo",
        });
      }

      res.status(204).send();
    },
  );
};
