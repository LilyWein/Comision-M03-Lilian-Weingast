import CommentPost from "../models/comment.model.js";


export const getAllComments = async (req, res) => {
  try {
   
    const allComments = await Comment.find({
      
      user: req.user.id,
     
    }).populate("user"); 
    res.status(200).json(allComments);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar todos los comentarios", error });
  }
};

// Ver Comentario por ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const commentFound = await Commend.findById(id);

    if (!commentFound)
      return res.status(404).json({ message: "No se encontró el comentario" });
    res.status(200).json(commentFound);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar el comentario por Id", error });
  }
};

// POST CREAR COMETARIO
export const createComment = async (req, res) => {
  const { autor, description } = req.body;
  try {
    const newComment = new Comment({
      autor,
      description,
      creatdate,
      user: req.user.id,
    });

    const savedComment = await newComment.save();
    res.status(200).json(savedPost);
  } catch (error) {
    return res.status(400).json({ message: "Error al crear el comentario", error });
  }
};

//PUT ACTUALIZAR COMENTARIO
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user");

    if (!updatePost)
      return res.status(404).json({ message: "Comentario no no encontrado" });

    res.status(200).json(updatedPost);
  } catch (error) {}
};

//DELETE ELIMINAR COMENTARIO
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment)
      return res
        .status(404)
        .json({ message: "No se encontró el comentario para eliminar" });
    res.status(200).json({ message: "Comentario eliminado" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al intentar eliminar el comentario", error });
  }
};
