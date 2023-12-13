import { usePosts } from "../context/PostContext";
import { Link } from "react-router-dom";

export const PostCard = ({ post }) => {
  const { deletePost } = usePosts();
 
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
            className="bg-gray-700  rounded-md px-2 py-1 mr-4"  
            onClick={() => deletePost(post._id)}
          >
            Eliminar
          </button>
          <Link className="bg-green-800 rounded-md px-2 py-1"  to={`/post/${post._id}`}>
            Editar
          </Link>
        </div>

       <p> 
        {new Date(post.date).toLocaleDateString()}
       </p>
      </div>
    </div>
       
  );
};
