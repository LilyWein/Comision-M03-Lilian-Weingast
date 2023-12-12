import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../middlewares/jwt.validation.js";


//registro y validación del usuario

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  const foundUser = await User.findOne({ email });
  if (foundUser) return res.status(400).json(["El Email ya está en uso"]);
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
   
    //token

    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token);
    res.json({
      message: "Usuario registrado con éxito",
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar al usuario", error: error.message });
  }
};

//login del usuario

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contraseña incorrecto"]);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      message: "Bienvenido!",
      username: userFound.username,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};


//logout del usuario

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Hasta pronto!" });
};


// Perfil de Usuario

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });
    return res.json({
      message: "perfil del usuario: ",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  
  } catch (error) {res
    .status(500)
    .json({ message: "Error en el perfil", error: error.message });
  }
};
