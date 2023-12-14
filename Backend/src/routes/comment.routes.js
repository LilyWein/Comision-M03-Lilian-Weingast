import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentById,
} from "../controllers/comment.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
const routes = Router();

routes.get("/postcomment/:id", getCommentById);
routes.post("/postcomment", authRequired, createComment);
routes.delete("/postcomment/:id", authRequired, deleteComment);

export default routes;
