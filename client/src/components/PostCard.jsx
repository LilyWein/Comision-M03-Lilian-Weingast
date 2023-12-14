import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const PostCard = ({ post }) => {
  const { register, handleSubmit} = useForm();

  const { deletePost, createComent, getComentById, comment } = usePosts();

  const navigate = useNavigate();

  useEffect(() => {
    getComentById(post._id)
  }, []);

  const redirigir = (id) =>{
   navigate(`/EditPostPage/${id}`)
  };  

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      postid: post._id
    }
    createComent(data);
    navigate("/post");
  });

  return (
    <div className="bg-gray-500  w-full p-10 rounded-md">
      <header className="text-center mb-4">
         <h1 className="text-2xl font-semibold text-white">{post.title}</h1>
      </header>
       
      <div className="flex items-start mb-4">
     
        <img
           src = {`${post.imageURL}`}
           alt=""
           className="max-w-1/3 h-auto rounded-md mr-4"
           width={300}
         />
        
        <p className="flex-1">{post.description}</p>
      </div>

      
      <div className="flex justify-between">
        <div>
          <button
            className="bg-gray-700  rounded-md w-20 h-10 mr-4"  
            onClick={() => deletePost(post._id)}>
             Eliminar
          </button>
          
          <button      
            className="bg-green-800 rounded-md w-20 h-10 px-5 py-2.5 mr-4" 
            onClick={() => redirigir(post._id)}>
              Editar
          </button> 
        </div>

       <p> 
         {new Date(post.date).toLocaleDateString()}
       </p>
       <div>
        
      {comment.map((singleComment, i) => (
        <div key={i}>
          <p className="text-2xl">{singleComment.autor}</p>
          <p className="text-2xl">{singleComment.description}</p>
          <p className="text-2xl">{singleComment.date}</p>
        </div>
      ))}
    </div>

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            rows="3"
            placeholder="Descripcion"
            {...register("description")}
            autoFocus
          /> 
          <button
            className="flex h-10 px-6 text-align:center font-semibold rounded-md bg-green-900 text-white my-5"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
      </div>
    </div>
       
  );
};
