import Comment from "../models/comment.model.js";

export const createCommment = async (req, res) => {
    const { description, autor } = req.body;
    try {
      const newcomment = new Comment({
        description,
        autor: req.user.id,
      });
  
      const savedComment = await newcomment.save();
      res.status(200).json(savedComment);
    } catch (error) {
      return res.status(400).json({ message: "Error al crear comentario", error });
    }
  };