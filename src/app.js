<<<<<<<<< Temporary merge branch 1
import authRoutes from "./routes/auth.js";

app.use("/auth", authRoutes);
=========
import express from "express";
const app = express();
const PORT = 3000;
import tasks from "./routes/tasks.js"

app.use(express.json());

app.use("/tasks", tasks)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})
>>>>>>>>> Temporary merge branch 2
