import dotenv from "dotenv";

dotenv.config();

export const settingDotEnvDB= () => {
  return {
    port: process.env.PORT,
    db: {
      uri: process.env.MONGO_URI,
      databaseName: process.env.DATABASE_NAME,
    },
  };
};

export const SECRET_TOKEN = () => {
  return {
    secret: process.env.JWT,
  };
};
