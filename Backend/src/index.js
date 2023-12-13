import { app } from "./app.js";
import { settingDotEnvDB } from "./config/dotenv.js";

const {port}= settingDotEnvDB;

app.listen(port, console.log(`Servidor en puerto ${PORT}`));