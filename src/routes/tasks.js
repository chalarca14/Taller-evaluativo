import express from "express"
import { createTask, deleteTask, getTask, updateTask } from "../controllers/tasks.controller.js"

const route = express.Router();

route.get("/", getTask)
route.post("/", createTask)
route.put("/:id", updateTask)
route.delete("/:id" ,deleteTask)

export default route