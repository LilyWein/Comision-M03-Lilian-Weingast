import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { usePosts } from "../context/PostContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const EditPostPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { getPostById, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadPost() {
      if (params.id) {
        const post = await getPostById(params.id);
        setValue("title", post.title);
        setValue("description", post.description);
        setValue("imageURL", post.imageURL);
      }
    }
    loadPost();
  }, [params.id, getPostById, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePost(params.id, data);
      navigate("/post");
    } catch (error) {
      console.error("Error updating post:", error);
    }
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
            type="text"
            placeholder="Imagen"
            {...register("imageURL")}
          />

          <button
            className="bg-green-800 rounded-md w-20 h-10 px-5 py-2.5 mr-4"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};
