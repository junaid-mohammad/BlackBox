// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Controller Logic for Level 3: Hashing with bcrypt
// Handles form submissions for user registration and login
// using PostgreSQL queries and bcrypt for secure password hashing.
// ------------------------------------------------------------------------

import db from "../db/db.js";   // PostgreSQL client
import bcrypt from "bcrypt";    // Import bcrypt for password hashing

// Number of salt rounds for bcrypt hashing
const saltRounds = 10;

// Render Pages
export function renderHome(req, res) {
  res.render("home.ejs");
}

export function renderLogin(req, res) {
  res.render("login.ejs");
}

export function renderRegister(req, res) {
  res.render("register.ejs");
}

// Handle Registration: now using bcrypt.hash to securely hash passwords
export async function handleRegister(req, res) {
  const { username: email, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      // bcrypt.hash is used here to hash the password with saltRounds
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal Server Error");
        }
        // Store the hashed password in the database
        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hash]);
        res.render("secrets.ejs");
      });
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Internal Server Error");
  }
}

// Handle Login: now using bcrypt.compare to verify the password
export async function handleLogin(req, res) {
  const { username: email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      // bcrypt.compare checks the entered password against the hashed password
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).send("Internal Server Error");
        }
        if (result) {
          res.render("secrets.ejs");
        } else {
          res.send("Incorrect Password");
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
}
