import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostContext";


export const PostCard = ({ post }) => {
  const { deletePost} = usePosts();
  const navigate = useNavigate();
  
  const redirigir = (id) =>{
   navigate(`/EditPostPage/${id}`)
  };

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
       {/* <p>
            Autor: {post.user},
  </p>*/}
      </div>
    </div>
       
  );
};
