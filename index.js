// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 1: Registering Users with Email & Password
// Initializes the Express app and delegates routes to secretRoutes.js.
// ------------------------------------------------------------------------

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import secretRoutes from "./routes/secretRoutes.js";
import "./db/db.js"; // PostgreSQL connection init

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine & middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", secretRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});