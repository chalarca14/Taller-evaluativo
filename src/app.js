import authRoutes from "./routes/auth.js"
import express from "express";
import tasks from "./routes/tasks.js"
import dotenv from "dotenv"

const app = express();
const PORT = 3000;
dotenv.config()



app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", tasks)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})



