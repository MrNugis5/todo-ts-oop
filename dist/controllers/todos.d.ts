import { Request, Response, NextFunction } from "express";
declare class TodoController {
    private todos;
    constructor();
    createTodo(req: Request, res: Response, next: NextFunction): void;
    getTodos(req: Request, res: Response, next: NextFunction): void;
    updateTodo(req: Request, res: Response, next: NextFunction): void;
    deleteTodo(req: Request, res: Response, next: NextFunction): void;
}
export declare const todoController: TodoController;
export {};
//# sourceMappingURL=todos.d.ts.map