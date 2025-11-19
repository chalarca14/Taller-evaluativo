import express from "express";
const app = express();
const PORT = 3000;
import tasks from "./routes/tasks.js"

app.use(express.json());

app.use("/tasks", tasks)


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})