import authRoutes from "./routes/auth.js";
import express from "express";
import tasks from "./routes/tasks.js"
import dotenv from "dotenv"
import cors from "cors"
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3000;
dotenv.config()

app.use(express.json());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", tasks)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true
    })
);

// Rate limiters

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Demasiados intentos. Intenta de nuevo en 1 minuto."
});

//para limitar los /tasks
const tasksLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: "Demasiadas solicitudes a /tasks. Intenta mas tarde"
});

