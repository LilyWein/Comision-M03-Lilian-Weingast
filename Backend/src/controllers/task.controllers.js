import Task from "../models/task.model.js";

//Buscar todas las tareas

export const getAllTask = async (req, res) => {
  try {
   
    const allTasks = await Task.find({
      
      user: req.user.id,
     
    }).populate("user"); 

    res.status(200).json(allTasks);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar todas las tareas", error });
  }
};

// Ver Tarea por ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFound = await Task.findById(id);

    if (!taskFound)
      return res.status(404).json({ message: "No se encontró la tarea" });
    res.status(200).json(taskFound);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar la tarea por Id", error });
  }
};

// POST CREAR TAREA
export const createTask = async (req, res) => {
  const { title, description,  date, completed} = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      date,
      completed,
      user:req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    return res.status(400).json({ message: "Error al crear la tarea", error });
  }
};

//PUT ACTUALIZAR TAREA
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user");

    if (!updateTask)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(200).json(updatedTask);
  } catch (error) {}
};

//DELETE ELIMINAR TAREA
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask)
      return res
        .status(404)
        .json({ message: "No se encontró la tarea para eliminar" });
    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al intentar eliminar la tarea", error });
  }
};
