// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 4: Sessions and Cookies
// Handles form submissions, page rendering, and passport-local strategy
// for secure session-based authentication.
// ------------------------------------------------------------------------

import { Strategy } from "passport-local";  // passport-local strategy for username/password auth
import db from "../db/db.js";               // PostgreSQL client
import bcrypt from "bcrypt";                // bcrypt for hashing passwords
import passport from "passport";            // passport for session-based auth

// Number of salt rounds for bcrypt
const saltRounds = 10;

// -----------------------------------------------------
// Render Pages
// -----------------------------------------------------
export function renderHome(req, res) {
  res.render("home.ejs");
}

export function renderLogin(req, res) {
  res.render("login.ejs");
}

export function renderRegister(req, res) {
  res.render("register.ejs");
}

export function renderSecrets(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
}

// -----------------------------------------------------
// Handle Registration
// -----------------------------------------------------
export async function handleRegister(req, res) {
  const { username: email, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      // Hash the password before storing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal Server Error");
        }
        // Store the hashed password
        const result = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [email, hash]
        );
        const user = result.rows[0];

        // Auto-login the user after registration
        req.login(user, (err) => {
          if (err) {
            console.error("Error during login after registration:", err);
            return res.status(500).send("Internal Server Error");
          }
          res.redirect("/secrets");
        });
      });
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Internal Server Error");
  }
}

// -----------------------------------------------------
// Configure Passport Local Strategy
// -----------------------------------------------------
passport.use(
  new Strategy(async (username, password, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        // Compare entered password with hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return cb(err);
          }
          if (isMatch) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        });
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  })
);
