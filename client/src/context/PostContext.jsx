import { createContext, useContext, useState } from "react";
import {
  createPostReq,
  getPostReq,
  deletePostReq,
  getPostByIdReq,
  updatePostReq,
} from "../api/post.js";
import {
  getCommentByIdReq,
  createComentReq,
} from "../api/comments.js"

const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("Error en el contexto de las tareas");
  return context;
};

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  const [comment,setComment] = useState([]);

  //Crear tarea
  const createPost = async (post) => {
 
    const res = await createPostReq(post);
  };

  //Buscar
  const getAllPost = async () => {
    const res = await getPostReq();
    
    try {
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar
  const deletePost = async (id) => {
    try {
      const res = await deletePostReq(id);
      // console.log(res);
      if (res.status === 200) setPost(post.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar por Id
  const getPostById = async (id) => {
    try {
      const res = await getPostByIdReq(id);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar
  const updatePost = async (id, post) => {
    try {
      const res = await updatePostReq(id, post);
    } catch (error) {
      console.log(error);
    }
  };

  //Buscar por Id
  const getComentById = async (id) => {
    try {
      const res = await getCommentByIdReq(id);
      setComment(res.data);
    } catch (error) {
      console.log(error);
    }
  }; 

    //Crear tarea
    const createComent = async (comment) => {
      
      const res = await createComentReq(comment);
    };

  return (
    <PostContext.Provider
      value={{
        post,
        comment,
        createPost,
        getAllPost,
        deletePost,
        getPostById,
        updatePost,
        getComentById,
        createComent,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};