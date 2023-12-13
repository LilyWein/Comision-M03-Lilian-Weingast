import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

export const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
 
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
      <h1 className="text-2xl font-semibold text-white">{post.title}</h1>
      <div className="flex gap-x-2 items-center"></div>
      <img
        src = {`https://ruta-del-servidor.com/${post.imageURL}`}
        alt=""
      />
      </header>
      <p className="">{post.description}</p>
        {/*client*/}
           
      <button
        className="bg-red-700 rounded-md px-2 mt 16"  onClick={() => {
        deletePost(post._id);  }}
      >
          eliminar
      </button>
      <Link className="bg-green-600 rounded-md px-2" to={`/post/${post._id}`}>
         editar
      </Link>
   
      <p className="text-2xl">
        {new Date(post.date).toLocaleDateString()}
      </p>
    
    </div>
       
  );
};
