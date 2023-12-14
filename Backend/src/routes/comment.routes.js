import { Router } from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment,
} from "../controllers/comment.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
const routes = Router();

routes.get("/postcomment", authRequired, getAllComments);
routes.get("/postcomment/:id", authRequired, getCommentById);
routes.post("/postcomment", authRequired, createComment);
routes.delete("/postcomment/:id", authRequired, deleteComment);

export default routes;
