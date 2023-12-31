import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

// Ver Comentario por ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const commentFound = await Comment.find({
        postid : id
    }).populate("autor").sort({date: -1});

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

//PUT ACTUALIZAR TAREA
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {new: true}
      );
    if (!updatedComment)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(200).json(updatedComment);
  } catch (error) {}
};

