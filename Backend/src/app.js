import express from "express";
import { settingDotEnvDB } from "./config/dotenv.js";
import cors from "cors";
import morgan from "morgan";
import { connectMongo } from "./database/db.js";
import authroutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js"
import cookieParser from "cookie-parser";

const app = express();
connectMongo();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(authroutes);
app.use(postRoutes);
app.use(commentRoutes);
const PORT = settingDotEnvDB().port;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));