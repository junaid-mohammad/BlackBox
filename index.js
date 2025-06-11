// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// Main application entry point. Sets up Express, static files, views,
// sessions, Passport, and delegates all route handling to secretRoutes.js.
// ------------------------------------------------------------------------

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import secretRoutes from "./routes/secretRoutes.js";
import "./db/db.js";           // Initialize PostgreSQL connection
import "./config/passport.js"; // Initialize Passport strategies

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// -----------------------------------------------------
// Path Setup for ES Module __dirname
// -----------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------
// View Engine (EJS) and Static Files Middleware
// -----------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------------------------------
// Session Management: express-session with cookie config
// -----------------------------------------------------
// Uses SESSION_SECRET from environment variables
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day lifetime
  })
);

// -----------------------------------------------------
// Initialize Passport for Authentication (Local & Google)
// -----------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// -----------------------------------------------------
// Delegate All Routing to Routes File
// -----------------------------------------------------
app.use("/", secretRoutes);

// -----------------------------------------------------
// Start Server on Configured Port
// -----------------------------------------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
