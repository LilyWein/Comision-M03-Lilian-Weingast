import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
 } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import {
  validateRegister,
  validateLogin,
  handleErrorValidations,
} from "../middlewares/validateAuth.js";

const router = Router();

router.post("/register", validateRegister, handleErrorValidations, register);

router.post("/login", validateLogin, handleErrorValidations, login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

export default router;
