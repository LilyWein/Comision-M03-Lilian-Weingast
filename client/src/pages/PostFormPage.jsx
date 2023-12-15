import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";

export const PostFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();

  const {createPost, getPostByIda, updatePost } = usePosts();


  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const postData = await getPostByIda(id);
          setValue("title", postData.title);
          setValue("description", postData.description);
          setValue("imageURL", postData.imageURL);
        } catch (error) {
          console.error("Error al obtener el post:", error);
        }
      }
      else{
        setValue("title", "");
        setValue("description", "");
        setValue("imageURL", "");
      }
    };
    fetchData();
  }, [id, getPostByIda, setValue]);

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    if (id) {
      updatePost(id,data)
    } else {

      createPost(data); 
    }
    navigate("/post");
  });
  return (
    <div>
      <Navbar />
      <div className="bg-gray-500 w-full p-10 rounded-md mt-20">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-orange-50 text-gray-950 px-2 py-2 rounded-md my-2"
            type="text"
            placeholder="Titulo"
            {...register("title")}
            autoFocus
          />
          <textarea
            className="w-full bg-orange-50 text-gray-950 px-2 py-2 rounded-md my-2"
            rows="3"
            placeholder="Descripción"
            {...register("description")}
          ></textarea>

          <input
            className="w-full bg-orange-50 text-gray-950 px-2 py-2 rounded-md my-2"
            type="string"
            placeholder="Imagen"
            {...register("imageURL")}
            autoFocus
          />

          <button
            className=" bg-gray-700 text-green-400 font-bold bg-opacity-80 rounded-md w-20 h-10 mr-4"
            type="submit"> Guardar                 
          </button>
          
        </form>
      </div>
    </div>
  );
};
