import { createContext, useContext, useState } from "react";
import {
  createTaskReq,
  getTaskReq,
  deleteTaskReq,
  getTaskByIdReq,
  updateTaskReq,
} from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("Error en el contexto de las tareas");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState([]);

  //Crear tarea
  const createTask = async (task) => {
 
    const res = await createTaskReq(task);
  };

  //Buscar
  const getAllTask = async () => {
    const res = await getTaskReq();
    
    try {
      setTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskReq(id);
      // console.log(res);
      if (res.status === 200) setTask(task.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar por Id
  const getTaskById = async (id) => {
    try {
      const res = await getTaskByIdReq(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar
  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskReq(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        task,
        createTask,
        getAllTask,
        deleteTask,
        getTaskById,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
