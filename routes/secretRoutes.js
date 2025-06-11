// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// Handles all application routes, including local login, Google OAuth,
// and page rendering routes. Delegates form logic to controllers.
// ------------------------------------------------------------------------

import express from "express";
import passport from "passport";
import {
  renderHome,
  renderLogin,
  renderRegister,
  renderSecrets,
  renderSubmit,
  handleSubmit,
  handleRegister
} from "../controllers/secretController.js";

const router = express.Router();

// -----------------------------------------------------
// Static Pages: Home, Login, Register, Secrets, Submit
// -----------------------------------------------------
router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/secrets", renderSecrets);
router.get("/submit", renderSubmit);

// -----------------------------------------------------
// User Registration (POST): bcrypt password hashing
// -----------------------------------------------------
router.post("/register", handleRegister);

// -----------------------------------------------------
// Secret Submission (POST): adds new secret for user
// -----------------------------------------------------
router.post("/submit", handleSubmit);

// -----------------------------------------------------
// Local Login: uses Passport LocalStrategy
// -----------------------------------------------------
router.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

// -----------------------------------------------------
// Google OAuth 2.0 Login: triggers Google login flow
// -----------------------------------------------------
router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// -----------------------------------------------------
// Google OAuth Callback: handles response from Google
// -----------------------------------------------------
router.get("/auth/google/secrets", passport.authenticate("google", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

// -----------------------------------------------------
// Logout: clears session and redirects to home page
// -----------------------------------------------------
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
    }
    res.redirect("/");
  });
});

export default router;
