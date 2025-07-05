import { Sequelize } from "sequelize";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Error: DATABASE_URL environment variable is not set.");
  process.exit(1);
}

console.log("Initializing Sequelize with DATABASE_URL...");

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres", 
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})