import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsByAutor,
  updatePost,
} from "../controllers/post.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

routes.get("/post", authRequired, getAllPosts);
routes.get("/post/:id", authRequired, getAllPostsByAutor);
routes.post("/post", authRequired, createPost);
routes.delete("/post/:id", authRequired, deletePost);
routes.put("/post/:id", authRequired, updatePost);

export default routes;
