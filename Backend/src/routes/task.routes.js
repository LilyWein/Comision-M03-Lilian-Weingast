import { Router } from "express";
import {
  getAllTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  
} from "../controllers/task.controllers.js";

import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

/* endpoint para para traer todos los post*/
routes.get("/task", authRequired, getAllTask);

/* endpoint para traer un post por ID*/
routes.get("/task/:id", authRequired, getTaskById);

/* endpoint para crear un post*/
routes.post("/task", authRequired, createTask);

/* endpoint para modificar un post*/
routes.put("/task/:id", authRequired, updateTask);

/* endpoint para borrar un post*/
routes.delete("/task/:id", authRequired, deleteTask);

/* endpoint para crear comentario*/
routes.post("/comment", authRequired, );


export default routes;