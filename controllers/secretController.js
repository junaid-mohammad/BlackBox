// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Controller Logic for Level 1
// Handles form submissions for user registration and login
// using PostgreSQL queries.
// ------------------------------------------------------------------------

import db from "../db/db.js";

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

// Handle Registration
export async function handleRegister(req, res) {
  const { username: email, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Internal Server Error");
  }
}

// Handle Login
export async function handleLogin(req, res) {
  const { username: email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (password === user.password) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal Server Error");
  }
}
