todo-mvc/
├── controllers/todoController.js   ← HTTP layer only
├── models/todoModel.js             ← All data access logic
├── routes/todoRouter.js            ← Route definitions + middleware wiring
├── middleware/validate.js          ← Input validation (separated concern)
├── utils/helpers.js                ← AppError class + catchAsync wrapper
├── dev-data/data/todos.json        ← Seed data with timestamps
├── app.js                          ← Express config, middleware stack
└── server.js                       ← HTTP server bootstrap & graceful shutdown
