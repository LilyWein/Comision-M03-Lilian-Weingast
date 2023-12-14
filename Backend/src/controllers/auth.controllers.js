import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/dotenv.js";
import { createAccessToken } from "../middlewares/jwt.validation.js";

export const register = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  //validación del usuario
  const foundUser = await User.findOne({ email });
  if (foundUser) return res.status(400).json(["El Email ya está en uso"]);
  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      password: passwordHash,
      avatar,
    });

    const savedUser = await newUser.save();
   
    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token);
    res.json({
      message: "Usuario creado con éxito",
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updateAt,
      avatar: savedUser.avatar,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Error en las credenciales"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Error en las credenciales"]);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      message: "Bienvenido!",
      username: userFound.username,
      avatar:userFound.avatar,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear usuario", error: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Hasta pronto!" });
};

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
      });
  
  } catch (error) {}
};

const { secret } = SECRET_TOKEN();

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, secret, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      avatar: userFound.avatar,
    });
  });
};
