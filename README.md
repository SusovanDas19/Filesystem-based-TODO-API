# Filesystem-based-TODO-API

A simple Filesystem-based TODO API built with ***Express.js*** and ***Node.js***. This API allows you to manage your ToDo tasks with basic **CRUD** operations.

## Routes 🚀

- **POST**: Create a new task with optional status.
- **DELETE**: Remove an existing task by its ID.
- **PUT**: Modify a task's details or update its status.
- **GET**: Retrieve a list of all tasks.

## File Structure 📁

```plaintext
Filesystem-based-TODO-API
│
├── index.js           # Contains the logic for the routes.
├── package.json       # Defines the project's dependencies, scripts
├── todos.json         # Stores the list of todos.
├── package-lock.json  # Records the exact versions of dependencies installed.
└── README.md          # Project documentation
