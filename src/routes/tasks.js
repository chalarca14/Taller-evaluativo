import express from "express"
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/tasks.controller.js"

const route = express.Router();

route.get("/", getTasks)
route.post("/", createTask)
route.put("/:id", updateTask)
route.delete("/:id" ,deleteTask)

export default route