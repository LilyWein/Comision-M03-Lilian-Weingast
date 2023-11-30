import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/dotenv.js";

const { secret } = SECRET_TOKEN();

export const authRequired = (req, res, next) => {
  
  const { token } = req.cookies;
  
  if (!token)
    return res
      .status(401)
      .json({ message: "Autorización Denegada, debe volver a iniciar sesión" });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token Invalido" });
   
    req.user = user;
   
    next();
  });
};
