
import prisma from "../prismaClient.js"


// lista todas las tareas

export const getTask = async (req, res) => {
    try {
        const task = await prisma.task.findMany();
        res.status(200).json(task)
    } catch (error) {
        console.error("Error al obtener lastareas:", error);
        res.status(500).json({
            error: "Error al obtener las tareas . intentalo nuevamente"
        });
    }
};

// crear una tarea 

export const createTask = async (req, res) => {
    try {
        const { tittle, description, usersId } = req.body;
        if (!tittle) {
            return res.status(400).json({
                error: "el titulo es obligatorio"
            });
        }
        const task = await prisma.task.create({
            data: {
                tittle,
                usersId,
                description: description || "",
                completed: false
            }
        });
        res.status(201).json(task)
    } catch (error) {
        console.error("erroral crear la tarea", error);
        res.status(500).json({
            error: "Error al crear la tarea intentalo de nuevo"
        });
    }
};

//actualizar una tarea 

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params; 
    const { tittle, description, completed } = req.body;

    // Validación de ID
    if (!id) {
      return res.status(400).json({ error: "El ID es obligatorio." });
    }

    // Verificar si la tarea existe
    const existingTask = await prisma.task.findUnique({
      where: { id: Number(id) }
    });

    if (!existingTask) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    // Actualización de la tarea

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: tittle ?? existingTask.tittle,
        description: description ?? existingTask.description,
        completed: completed ?? existingTask.completed
      }
    });

    res.status(200).json(updatedTask);

  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({
      error: "Error al actualizar la tarea. Inténtalo nuevamente."
    });
  }
};

// eliminar tarea 

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validación de ID
    if (!id) {
      return res.status(400).json({ error: "El ID es obligatorio." });
    }

    // Verificar si la tarea existe
    const existingTask = await prisma.task.findUnique({
      where: { id: Number(id) }
    });

    if (!existingTask) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    // Eliminar la tarea
    await prisma.task.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: "Tarea eliminada correctamente." });

  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({
      error: "Error al eliminar la tarea. Inténtalo nuevamente."
    });
  }
};
