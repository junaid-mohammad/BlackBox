// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// Handles form submissions and page rendering logic.
// ------------------------------------------------------------------------

import bcrypt from "bcrypt";
import db from "../db/db.js";

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

export function renderSecrets(req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
}

// Handle Registration with bcrypt hashing
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
