import express from "express"
import { createTask, deleteTask, getTask, updateTask } from "../controllers/tasks.controller.js"
import middlewareWrapper from "../middlewares/authMiddleware.js";
import passport from "../config/passport.js";

const route = express.Router();

// route.use(authMiddleware);

route.get("/", passport.authenticate("jwt",{session:false}), getTask)
route.post("/", passport.authenticate("jwt",{session:false}), createTask)
route.put("/:id", passport.authenticate("jwt",{session:false}), updateTask)
route.delete("/:id" , passport.authenticate("jwt",{session:false}), deleteTask)

export default route

// Passport

// Más limpio, profesional, fácil de mantener.

// Explicación:

// Elegimos usar exclusivamente Passport para la protección de rutas porque estandariza el manejo de autenticación, evita duplicar lógica con middleware manual y facilita agregar nuevas estrategias en el futuro.