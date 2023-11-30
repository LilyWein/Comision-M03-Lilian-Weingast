import dotenv from "dotenv";

dotenv.config();

export const settingDotEnvDB= () => {
  return {
    port: process.env.PORT,
    db: {
      host: process.env.DB_HOST || 'localhost',
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/',
      databaseName: process.env.DATABASE_NAME || 'proyectofinal',
    },
  };
};

export const SECRET_TOKEN = () => {
  return {
    secret: process.env.JWT,
  };
};
