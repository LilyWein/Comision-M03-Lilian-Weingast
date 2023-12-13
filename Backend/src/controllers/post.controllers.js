import Post from "../models/post.model.js";


export const getAllPosts = async (req, res) => {
  try {
   
    const allPosts = await Post.find({
      
      user: req.user.id,
     
    }).populate("user"); 
    res.status(200).json(allPosts);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar todas las tareas", error });
  }
};

// Ver Tarea por ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postFound = await Post.findById(id);

    if (!postFound)
      return res.status(404).json({ message: "No se encontró la tarea" });
    res.status(200).json(postFound);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al buscar la tarea por Id", error });
  }
};

// POST CREAR TAREA
export const createPost = async (req, res) => {
  const { title, description, imageURL} = req.body;
  try {
    console.log(req)
    const newPost = new Post({
      title,
      description,
      imageURL,
      /*autor: req.user.username,*/
      });

    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Error al crear la tarea", error });
  }
};

//PUT ACTUALIZAR TAREA
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("user");

    if (!updatePost)
      return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(200).json(updatedPost);
  } catch (error) {}
};

//DELETE ELIMINAR TAREA
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost)
      return res
        .status(404)
        .json({ message: "No se encontró la tarea para eliminar" });
    res.status(200).json({ message: "Tarea eliminada" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error al intentar eliminar la tarea", error });
  }
};
