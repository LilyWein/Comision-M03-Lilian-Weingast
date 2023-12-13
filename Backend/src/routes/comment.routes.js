import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComment,
  getCommentById,
  updateComment,
} from "../controllers/comment.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { updateComment } from "../controllers/comment.controllers.js";

const routes = Router();

routes.get("/post", authRequired, getAllComment);
routes.get("/post/:id", authRequired, getCommentById);
routes.post("/post", authRequired, createComment);
routes.delete("/post/:id", authRequired, deleteComment);
routes.put("/post/:id", authRequired, updateComment);

export default routes;
