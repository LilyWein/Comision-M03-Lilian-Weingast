import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const PostFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();

  const {post, createPost, getPostById, updatePost } = usePosts();
  
  const params = useParams();
  useEffect(() => {
    
    async function loadPost() {
      if (params.id) {
        const post = await getPostById(params.id);
       
        setValue("title", post.title);
        setValue("description", post.description);
      }
    }
    loadPost();
  }, []);

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
   
    if (params.id) {
      updatePost(params.id, data);
    } else {
      createPost(data);
    }
    navigate("/post");
  });
  return (
    <div>
      <Navbar />
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="text"
            placeholder="Titulo"
            {...register("title")}
            autoFocus
          />
          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            rows="3"
            placeholder="Descripción"
            {...register("description")}
          ></textarea>

          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="string"
            placeholder="Imagen"
            {...register("imageURL")}
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
  );
};
