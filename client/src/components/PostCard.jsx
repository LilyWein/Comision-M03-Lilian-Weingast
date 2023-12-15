import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PostCard = ({ post }) => {
  const { register, handleSubmit } = useForm();
  const { deletePost, createComent, getComentById, updateComment, deleteComment } = usePosts();
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnUpdate, setisOnUpdate] = useState(0);
  const [changeComment, setchangeComment] = useState("");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await getComentById(post._id);
        console.log(commentsData)
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

  const editComment = async (id) => {

    let comment = {
      Id: id,
      description: changeComment
    }

    let rsp = await updateComment(comment)

    window.location.reload();
  }

  const deleteComm = async (id) => {
    let rsp = await deleteComment(id);
    console.log(rsp)
    window.location.reload();
  }

  const onSubmit = handleSubmit((data) => {
    data = {
      ...data,
      postid: post._id
    }
    createComent(data);
    window.location.reload();
  });

  return (
    <div className="bg-gray-500  w-full mt-5 px-3 rounded-md">
      <header className="text-alignate-left mb-5">
        <h1 className="text-2xl font-bold underline underline-offset-4 uppercase text-gray-950">{post.title}</h1>

        <div className="flex items-center mt-2"> {/* Contenedor flex para avatar y fecha */}
          <img
            className="h-8 w-8 rounded-full mr-2"
            src={post && post.user?.avatar !== null && post.user?.avatar !== undefined ? post.user?.avatar : "https://media.istockphoto.com/id/1298261537/es/vector/marcador-de-posici%C3%B3n-del-icono-de-la-cabeza-del-perfil-del-hombre-en-blanco.jpg?s=612x612&w=0&k=20&c=e6fPb6CH61RvtxbSfhsVInccMuXXLEkKpV6aVGfywWo="}
            alt=""
          />
          <div className="flex flex-col">
            <p className="text-gray-300 font-semibold">{post.user.username}</p>

          </div>
        </div>
      </header>

      <div className="flex items-start mb-4">

        <img
          src={`${post.imageURL}`}
          alt=""
          className="max-w-1/3 h-auto rounded-md mr-4"
          width={300}
        />

        <p className="flex-items-start text-sm text-gray-950">{post.description}</p>
      </div>


      <div className="flex justify-end py-2">
        <p className="text-gray-300">{new Date(post.createdAt).toLocaleString('es-ES')}</p>

      </div>

      <div className="flex justify-end  text">
        {user?.id == post.user?._id || user?.id == post?.user ? (
          <div>

            <button
              className="bg-gray-700 text-green-400 text-xs font-semibold rounded-md w-20 h-10 m-3"
              onClick={() => redirigir(post._id)}>
              Editar
            </button>

            <button
              className="bg-gray-700 text-red-500 text-xs font-semibold rounded-md w-20 h-10 m-3 "
              onClick={() => deletePost(post._id)}>
              Eliminar
            </button>



          </div>
        ) : null}


      </div>

      <div className="w-full ">
        <button
          onClick={toggleAccordion}
          className="w-full py-2 px-4 text-left bg-gray-500 hover:bg-gray-600 text-gray-900 font-bold focus:outline-none"
        >
          Comentarios  (menu desplegable)
        </button>
        {isOpen && (
          <div className="w-full">
            <div className="bg-gray-600  w-full mt-3 p-3 rounded-md">
              <form onSubmit={onSubmit}>
                <input
                  className= "w-full bg-stone-50 text-black  px-2 py-2 my-2"
                  type="text"
                  rows="3"
                  placeholder="Descripcion"
                  {...register("description")}
                  autoFocus
                />
                <button
                  className=" flex p-2 text-xs text-align:center font-semibold rounded-md my-3 bg-gray-700 text-green-400  "
                  type="submit"
                >
                  Guardar
                </button>
              </form>
            </div >

            {comments.map((singleComment, i) => (
              <div className="flex items-center mt-2 text-2x1 bg-gray-400 py-1 my-2 text-2x1 w-full p-10 rounded-md" key={i}>
                <div  >
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={singleComment && singleComment.autor?.avatar !== null && singleComment.autor?.avatar !== undefined ? singleComment.autor?.avatar : "https://media.istockphoto.com/id/1298261537/es/vector/marcador-de-posici%C3%B3n-del-icono-de-la-cabeza-del-perfil-del-hombre-en-blanco.jpg?s=612x612&w=0&k=20&c=e6fPb6CH61RvtxbSfhsVInccMuXXLEkKpV6aVGfywWo="}
                      alt=""
                    />
                    <p className="text-small">{singleComment.autor?.username}</p>
                    <p className="text-xs px-40">{new Date(singleComment.date).toLocaleString('es-ES')}</p>
                  </div>
                  {
                    isOnUpdate === singleComment._id ?
                      <>
                        <input type="text" className="flex items start-0 w-full bg-stone-50 text-black  px-2 py-2 rounded-md my-2" onChange={e => setchangeComment(e.target.value)} />, <br />

                        <div className="flex justify-end  text">
                          <button className=" bg-gray-700 text-green-400 text-xs font-semibold rounded-md w-20 h-10 m-3" onClick={() => editComment(singleComment._id)} >Aceptar</button>
                          <button className=" bg-gray-700 text-red-500 text-xs font-semibold rounded-md w-20 h-10 m-3" onClick={() => setisOnUpdate(0)}>Cancelar</button>
                        </div>

                      </> :
                      <>
                        <p className="w-full text-s bg bg-gray-300 rounded-md text-gray-800">{singleComment.description}</p>
                        {
                          singleComment.autor._id === user?.id ?
                            <>
                              <div className="flex justify-end  text-small">
                                <button className=" bg-gray-700 text-green-400 text-xs font-semibold rounded-md w-20 h-10 m-3" onClick={() => setisOnUpdate(singleComment._id)} >Editar</button>
                                <button className="bg-gray-700 text-red-500 text-xs font-semibold rounded-md w-20 h-10 m-3" onClick={() => deleteComm(singleComment._id)}>Eliminar</button>
                              </div>
                            </> : null
                        }
                      </>
                  }

                </div>
              </div>
            ))}
          </div>
        )}
      </div>




    </div>

  );
};
