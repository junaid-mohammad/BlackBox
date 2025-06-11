// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Database Client Setup
// Initializes and exports a PostgreSQL client using environment variables
// from .env. Connects with SSL in production for Azure flexibility.
// ------------------------------------------------------------------------

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Initialize PostgreSQL client with .env variables
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Connect to DB and handle errors
db.connect()
  .then(() => {
    console.log("📦 Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

export default db;
