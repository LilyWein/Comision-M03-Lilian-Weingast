import Comment from "../models/comment.model.js";


// Ver Comentario por ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const commentFound = await Comment.find({
        postid : id
    });
    
    if (!commentFound)
      return res.status(404).json({ message: "No se encontró el comentario" });
    res.status(200).json(commentFound);
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .json({ message: "Error al buscar el comentario por Id", error });
  }
};

// POST CREAR COMETARIO
export const createComment = async (req, res) => {
  const { postid, description } = req.body;
  try {
    const newComment = new Comment({
      autor: req.user.id,
      description,
      postid,
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error al crear el comentario", error });
  }
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
