// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// Handles form submissions, secret storage/retrieval, and page rendering.
// Uses a separate "secrets" table to store multiple secrets per user.
// ------------------------------------------------------------------------

import bcrypt from "bcrypt";
import db from "../db/db.js";

const saltRounds = 10;

// -----------------------------------------------------
// Renders the home page
// -----------------------------------------------------
export function renderHome(req, res) {
  res.render("home.ejs");
}

// -----------------------------------------------------
// Renders the login page
// -----------------------------------------------------
export function renderLogin(req, res) {
  res.render("login.ejs");
}

// -----------------------------------------------------
// Renders the registration page
// -----------------------------------------------------
export function renderRegister(req, res) {
  res.render("register.ejs");
}

// -----------------------------------------------------
// Renders the secrets page for the logged-in user
// Fetches ALL secrets belonging to this user from DB
// -----------------------------------------------------
export async function renderSecrets(req, res) {
  if (req.isAuthenticated()) {
    try {
      const result = await db.query(
        "SELECT content FROM secrets WHERE user_id = $1",
        [req.user.id]
      );
      const secrets = result.rows.map(row => row.content);
      res.render("secrets.ejs", { secrets });
    } catch (err) {
      console.error("Error fetching user secrets:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/login");
  }
}

// -----------------------------------------------------
// Renders the page to submit a new secret
// Only accessible if logged in
// -----------------------------------------------------
export function renderSubmit(req, res) {
  if (req.isAuthenticated()) {
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
}

// -----------------------------------------------------
// Handles submission of a new secret
// Inserts a new secret row tied to the logged-in user
// -----------------------------------------------------
export async function handleSubmit(req, res) {
  const secret = req.body.secret;
  try {
    await db.query(
      "INSERT INTO secrets (user_id, content) VALUES ($1, $2)",
      [req.user.id, secret]
    );
    res.redirect("/secrets");
  } catch (err) {
    console.error("Error submitting secret:", err);
    res.status(500).send("Internal Server Error");
  }
}

// -----------------------------------------------------
// Handles user registration with bcrypt password hashing
// Checks if email exists first, then inserts new user
// -----------------------------------------------------
export async function handleRegister(req, res) {
  const { username: email, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal Server Error");
        }
        const result = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [email, hash]
        );
        const user = result.rows[0];
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
