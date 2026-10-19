"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const todos = [];
const createTodo = (req, res, next) => {
    try {
        const task = req.body.task;
        const newTodo = new todo_1.Todo(Math.random().toString(), task);
        todos.push(newTodo);
        res.status(201).json({
            message: "Created new todo",
            createdTask: newTodo
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    try {
        res.status(201).json({
            tasks: todos
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    try {
        const todoId = req.params.id;
        const updatedTask = req.body.task;
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        const existingTodo = todos[todoIndex];
        if (!existingTodo) {
            throw new Error("Could not find todo");
        }
        todos[todoIndex] = new todo_1.Todo(existingTodo.id, updatedTask);
        res.status(201).json({
            message: "Updated todo",
            updatedTask: todos[todoIndex]
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateTodo = updateTodo;
//# sourceMappingURL=todos.js.map