// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 4: Sessions and Cookies
// Initializes the Express app, sets up Passport for session-based auth,
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
import "./db/db.js"; // PostgreSQL connection init

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
    saveUninitialized: true,
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
// Passport Serialization and Deserialization
// -----------------------------------------------------
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// -----------------------------------------------------
// Start Server
// -----------------------------------------------------
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
