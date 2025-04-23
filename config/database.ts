import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "projectbackend2",
  process.env.DB_USER || "developer",
  process.env.DB_PASSWORD || "Developer@2023",
  {
    host: process.env.DB_HOST || "134.122.64.108",
    dialect: "mysql",
    logging: false,
  }
);
