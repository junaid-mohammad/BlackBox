// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// All Passport strategies and session serialization/deserialization logic.
// ------------------------------------------------------------------------

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import bcrypt from "bcrypt";
import db from "../db/db.js";

// -----------------------------------------------------
// Local Strategy: Email/Password Authentication
// -----------------------------------------------------
// When a user logs in with email & password, this verifies credentials.
// If email exists and password matches (bcrypt.compare), login succeeds.
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return cb(err);
          if (isMatch) return cb(null, user);  // Successful login
          return cb(null, false);               // Password mismatch
        });
      } else {
        return cb(null, false);                 // Email not found
      }
    } catch (err) {
      return cb(err);                          // DB error
    }
  })
);

// -----------------------------------------------------
// Google OAuth Strategy
// -----------------------------------------------------
// Allows users to log in via Google. If email exists in DB, use it.
// Otherwise, create a new user with Google email and placeholder password.
passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
      if (result.rows.length === 0) {
        // No user yet – create new user with Google email
        const newUser = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [profile.email, "google"]
        );
        cb(null, newUser.rows[0]);
      } else {
        cb(null, result.rows[0]);  // User already exists
      }
    } catch (err) {
      console.error("Error during Google authentication:", err);
      cb(err);
    }
  })
);

// -----------------------------------------------------
// Session Handling
// -----------------------------------------------------
// Only store minimal data in cookie (entire user object here for simplicity).
// For production, best practice: only store user.id!
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});