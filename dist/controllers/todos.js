"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoController = void 0;
const todo_1 = require("../models/todo");
class TodoController {
    todos = [];
    constructor() {
        this.createTodo = this.createTodo.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }
    createTodo(req, res, next) {
        try {
            const task = req.body.task;
            const newTodo = new todo_1.Todo(Math.random().toString(), task);
            this.todos.push(newTodo);
            res.status(201).json({
                message: "Created new todo",
                createdTask: newTodo
            });
        }
        catch (error) {
            next(error);
        }
    }
    getTodos(req, res, next) {
        try {
            res.status(201).json({
                tasks: this.todos
            });
        }
        catch (error) {
            next(error);
        }
    }
    updateTodo(req, res, next) {
        try {
            const todoId = req.params.id;
            const updatedTask = req.body.task;
            const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
            const existingTodo = this.todos[todoIndex];
            if (!existingTodo) {
                throw new Error("Could not find todo");
            }
            this.todos[todoIndex] = new todo_1.Todo(existingTodo.id, updatedTask);
            res.status(201).json({
                message: "Updated todo",
                updatedTask: this.todos[todoIndex]
            });
        }
        catch (error) {
            next(error);
        }
    }
    deleteTodo(req, res, next) {
        try {
            const todoId = req.params.id;
            const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
            const existingTodo = this.todos[todoIndex];
            if (!existingTodo) {
                throw new Error("Could not find todo");
            }
            this.todos.splice(todoIndex, 1);
            res.status(201).json({
                message: "Deleted todo",
                deletedTask: existingTodo
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.todoController = new TodoController();
//# sourceMappingURL=todos.js.map