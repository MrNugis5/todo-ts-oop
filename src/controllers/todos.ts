import {Request, Response, NextFunction} from "express";
import{Todo} from "../models/todo" 

const todos: Todo[] = []   

export const createTodo = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const task = (req.body as {task:string}).task
        const newTodo = new Todo(Math.random().toString(), task)
        todos.push(newTodo)
        res.status(201).json({
            message: "Created new todo",
            createdTask: newTodo
        })
    } catch(error){
        next(error)
    } 
} 

export const getTodos = (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.status(201).json({
            tasks: todos
        })
    } catch(error){
        console.log(error)
    } 
}

export const updateTodo = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const todoId = req.params.id
        const updatedTask = (req.body as {task:string}).task
        const todoIndex = todos.findIndex(todo => todo.id === todoId)
        const existingTodo = todos[todoIndex]
        if(!existingTodo){
            throw new Error("Could not find todo")
        }
        todos[todoIndex] = new Todo(existingTodo.id, updatedTask)
        res.status(201).json({
            message: "Updated todo",
            updatedTask: todos[todoIndex]
        })
    } catch(error){
        console.log(error)
    } 
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) =>{
    try{
        const todoId = req.params.id
        const todoIndex = todos.findIndex(todo => todo.id === todoId)
        const existingTodo = todos[todoIndex]
        if(!existingTodo){
            throw new Error("Could not find todo")
        }
        todos.splice(todoIndex, 1)
        res.status(201).json({
            message: "Deleted todo",
            deletedTask: existingTodo
        })
    } catch(error){
        console.log(error)
    } 
}