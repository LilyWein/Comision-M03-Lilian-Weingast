import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const PostComment = ({ post_id }) => {
  const { register, handleSubmit} = useForm();
  const { createComent, getComentById, comment } = usePosts();
  const navigate = useNavigate();
  const [postComments, setPostComments] = useState([]);
  
  useEffect(() => {
    getComentById(post._Id).then((comments) => {
      setPostComments(comments);
    });
  }, [getComentById, post._Id]);

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      postid: post._id
    };
   
    createComment(data).then(() => {
    getCommentsByPostId(postId).then((comments) => {
        setPostComments(comments);
        });
      });
  
      navigate(`/posts/${postId}`);
    });

    return (
        <div>
          <h2>Comments:</h2>
          <div>
            {postComments.map((comment, index) => (
              <div key={index}>
                <p>{comment.author}</p>
                <p>{comment.description}</p>
                <p>{comment.date}</p>
              </div>
            ))}
          </div>
    
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Enter comment"
              {...register("description")}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
  
   /*return (
    <div className="bg-gray-800  w-full p-10 rounded-md">
      <header className="text-center mb-4">
         <h1 className="text-2xl font-semibold text-white">Comentario</h1>
      </header>
    
    <div>
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
    </div>
     
  </div>
       
);
};

/*export const PostComment = ({ postId }) => {
  const { register, handleSubmit } = useForm();
  const { createComment, getCommentsByPostId, comments } = usePosts();
  const navigate = useNavigate();

  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    // Aquí se llama a la función para obtener los comentarios por ID de post
    getCommentsByPostId(postId).then((comments) => {
      setPostComments(comments);
    });
  }, [getCommentsByPostId, postId]);

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      postId: postId
    };

    // Aquí se llama a la función para crear un comentario
    createComment(data).then(() => {
      // Después de crear el comentario, se actualiza la lista de comentarios
      getCommentsByPostId(postId).then((comments) => {
        setPostComments(comments);
      });
    });

    // Redirige al usuario después de crear el comentario
    navigate(`/posts/${postId}`);
  });

  return (
    <div>
      <h2>Comments:</h2>
      <div>
        {postComments.map((comment, index) => (
          <div key={index}>
            <p>{comment.author}</p>
            <p>{comment.description}</p>
            <p>{comment.date}</p>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter comment"
          {...register("description")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};*/