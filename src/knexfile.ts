import path from "path";
import { AppConfig } from "./App/Config/appConfig";


export default {
  development: {
    client: AppConfig.client,
    connection: {
      user: AppConfig.user,
      password: AppConfig.password,
      database: AppConfig.database
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: path.join(__dirname, "./App/database/migrations/"),
      extension: "ts",
    },
    seeds: {
      directory: path.join(__dirname, "./App/database/seeds"),
    },
  },
};
