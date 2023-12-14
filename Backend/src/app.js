import express from "express";
import { settingDotEnvDB } from "./config/dotenv.js";
import cors from "cors";
import morgan from "morgan";
import { connectMongo } from "./database/db.js";
import authroutes from "./routes/auth.routes.js";
<<<<<<< Updated upstream
import taskRoutes from "./routes/task.routes.js";
=======
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js"
>>>>>>> Stashed changes
import cookieParser from "cookie-parser";

export const app = express();
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
<<<<<<< Updated upstream
app.use(taskRoutes);
=======
app.use(postRoutes);
app.use(commentRoutes);
>>>>>>> Stashed changes
const PORT = settingDotEnvDB().port || 5000;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));