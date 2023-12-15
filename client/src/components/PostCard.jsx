import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PostCard = ({ post }) => {
  const { register, handleSubmit} = useForm();
  const { deletePost, createComent, getComentById, comment } = usePosts();
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await getComentById(post._id);
        setComments(commentsData);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchData();
  }, [post._id, getComentById]);

  const navigate = useNavigate();
  
  const redirigir = (id) =>{
   navigate(`/post/${id}`)
  };

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      postid: post._id
    }
    createComent(data);
    navigate("/post");
    window.location.reload();
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
        
        <p className="flex- items-start ">{post.description}</p>
      </div>

      
      <div className="flex justify-between">
      {user?.id === post.user?._id || user?.id === post?.user ? (
        <div>
          <button
            className="bg-gray-700  rounded-md w-20 h-10 m-3 "  
            onClick={() => deletePost(post._id)}>
             Eliminar
          </button>
          
          <button      
            className="bg-green-800 rounded-md w-20 h-10 px-5 py-2.5 m-2" 
            onClick={() => redirigir(post._id)}>
              Editar
          </button> 
          <Link
            to="/CommentPage"
            className=" bg-gray-500 border-2 text-center rounded-md p-2 m-30 w-full "
          >
           Comentar
          </Link>


        </div>
        ) : null}
       <p> 
         {new Date(post.date).toLocaleDateString()}
       </p>
      </div>  
       
    <div>
   {/*} <button      
       className="bg-gray-600 rounded-md w-full h-10 px-5 py-2.5 m-2" 
       onClick={() => redirigir(post._id)}>
        
  </button>*/ }
     
    </div>
   {/* <div>
      {comment.map((singleComment, i) => (
         <div className= "bg-gray-500  w-full p-10 rounded-md" key={i}>
           <p className="text-2xl">{singleComment.autor}</p>
           <p className="text-2xl">{singleComment.description}</p>
           <p className="text-2xl">{singleComment.date}</p>
         </div>
        ))}
    </div>

    <div className="bg-zinc-800 max-w-md w-full mt-3 p-10 rounded-md">
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
          className="flex h-8 w= 8 px-6 text-align:center font-semibold rounded-md bg-green-800 text-white my-5"
          type="submit"
        >
          Guardar
        </button>
      </form>
    </div>*/}
     
      </div>
       
);
};
