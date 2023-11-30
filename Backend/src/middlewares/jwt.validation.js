import jwt from "jsonwebtoken";
import { SECRET_TOKEN } from "../config/dotenv.js";

const { secret } = SECRET_TOKEN();

export const createAccessToken = (payload) => {
  
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "10h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
