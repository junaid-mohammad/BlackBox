// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// Main app entry point. Initializes Express, sessions, Passport,
// and delegates routes to secretRoutes.js.
// ------------------------------------------------------------------------

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import secretRoutes from "./routes/secretRoutes.js";
import "./db/db.js";      // PostgreSQL connection init
import "./config/passport.js"; // Passport strategies

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------------------------------
// View Engine & Middleware
// -----------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------------------------------
// Session Configuration
// -----------------------------------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
  })
);

// -----------------------------------------------------
// Initialize Passport for session-based auth
// -----------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// -----------------------------------------------------
// Routes
// -----------------------------------------------------
app.use("/", secretRoutes);

// -----------------------------------------------------
// Start Server
// -----------------------------------------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
