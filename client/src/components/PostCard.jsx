import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PostCard = ({ post }) => {
  const { register, handleSubmit } = useForm();
  const { deletePost, createComent, getComentById } = usePosts();
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


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

  const redirigir = (id) => {
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
          src={`${post.imageURL}`}
          alt=""
          className="max-w-1/3 h-auto rounded-md mr-4"
          width={300}
        />

        <p className="flex- items-start ">{post.description}</p>
      </div>


      <div className="flex justify-between">
        {user?.id == post.user?._id || user?.id == post?.user ? (
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
          <img
            className="h-8 w-8 rounded-full"
            src={user && user.avatar !== null && user.avatar !== undefined ? user.avatar : "https://media.istockphoto.com/id/1298261537/es/vector/marcador-de-posici%C3%B3n-del-icono-de-la-cabeza-del-perfil-del-hombre-en-blanco.jpg?s=612x612&w=0&k=20&c=e6fPb6CH61RvtxbSfhsVInccMuXXLEkKpV6aVGfywWo="}
            alt=""
          />
          {post.user.username} <br /> {new Date(post.date).toLocaleDateString()}
        </p>

      </div>

      <div className="w-full max-w-md mx-auto">
      <button
        onClick={toggleAccordion}
        className="w-full py-2 px-4 text-left bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
        Desplegar menú
      </button>
      {isOpen && (
        <div className="border rounded mt-2">
                <div className="bg-stone-400 max-w-md w-full mt-3 p-3 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            className="flex items start-0 w-full bg-stone-50 text-black  px-2 py-2 rounded-md my-2"
            type="text"
            rows="3"
            placeholder="Descripcion"
            {...register("description")}
            autoFocus
          />
          <button
            className="flex p-2 text-align:center font-semibold rounded-md bg-green-800 text-green-200  my-3"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
          {comments.map((singleComment, i) => (
          <div className="bg-gray-500  w-full p-10 rounded-md" key={i}>
            <p className="text-2xl">{singleComment.autor}</p>
            <p className="text-2xl">{singleComment.description}</p>
            <p className="text-2xl">{singleComment.date}</p>
          </div>
        ))}
        </div>
      )}
    </div>
      



    </div>

  );
};
