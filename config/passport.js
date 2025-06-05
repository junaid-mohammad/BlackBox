// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// All Passport strategies and serialization/deserialization logic.
// ------------------------------------------------------------------------

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import bcrypt from "bcrypt";
import db from "../db/db.js";

// -----------------------------------------------------
// Local Strategy for Email/Password Login
// -----------------------------------------------------
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [username]);

      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return cb(err);
          if (isMatch) return cb(null, user);
          return cb(null, false);
        });
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  })
);

// -----------------------------------------------------
// Google OAuth Strategy
// -----------------------------------------------------
passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [profile.email]);
      if (result.rows.length === 0) {
        const newUser = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [profile.email, "google"]
        );
        cb(null, newUser.rows[0]);
      } else {
        cb(null, result.rows[0]);
      }
    } catch (err) {
      console.error("Error during Google authentication:", err);
      cb(err);
    }
  })
);

// -----------------------------------------------------
// Serialize and Deserialize
// -----------------------------------------------------
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
