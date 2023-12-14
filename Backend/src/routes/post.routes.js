import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getAllPostsByAutor,
  updatePost,
} from "../controllers/post.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";

const routes = Router();

routes.get("/post", getAllPosts);
routes.get("/postbyid/:id", authRequired, getPostById);
routes.get("/post/:id", authRequired, getAllPostsByAutor);
routes.post("/post", authRequired, createPost);
routes.delete("/post/:id", authRequired, deletePost);
routes.put("/post/:id", authRequired, updatePost);

export default routes;
