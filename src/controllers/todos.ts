import {Request, Response, NextFunction} from "express";
import {Todo} from "../models/todo";

class TodoController {
    private todos: Todo[] = [];

    constructor() {
        this.createTodo = this.createTodo.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    createTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const task = (req.body as {task: string}).task;
            const newTodo = new Todo(Math.random().toString(), task);
            this.todos.push(newTodo);
            res.status(201).json({
                message: "Created new todo",
                createdTask: newTodo
            });
        } catch (error) {
            next(error);
        }
    }

    getTodos(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(201).json({
                tasks: this.todos
            });
        } catch (error) {
            next(error);
        }
    }

    updateTodo(req: Request, res: Response, next: NextFunction) {
        try {
            const todoId = req.params.id;
            const updatedTask = (req.body as {task: string}).task;
            const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
            const existingTodo = this.todos[todoIndex];
            if (!existingTodo) {
                throw new Error("Could not find todo");
            }
            this.todos[todoIndex] = new Todo(existingTodo.id, updatedTask);
            res.status(201).json({
                message: "Updated todo",
                updatedTask: this.todos[todoIndex]
            });
        } catch (error) {
            next(error);
        }
    }

    deleteTodo(req: Request, res: Response, next: NextFunction) {
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
        } catch (error) {
            next(error);
        }
    }
}

export const todoController = new TodoController();
