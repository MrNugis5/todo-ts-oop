import { Router } from "express";
import {createTodo, getTodos} from "../controllers/todos" 

const router = Router()

router.post("/", createTodo)
router.get("/", getTodos)

export default router