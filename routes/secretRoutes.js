// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Level 6: Google OAuth 2.0
// All route handling, including Google OAuth endpoints.
// ------------------------------------------------------------------------

import express from "express";
import passport from "passport";
import {
  renderHome,
  renderLogin,
  renderRegister,
  renderSecrets,
  handleRegister
} from "../controllers/secretController.js";

const router = express.Router();

// Static pages
router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/secrets", renderSecrets);

// Registration POST
router.post("/register", handleRegister);

// Local login POST
router.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

// Google OAuth login
router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

// Google OAuth callback
router.get("/auth/google/secrets", passport.authenticate("google", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
    }
    res.redirect("/");
  });
});

export default router;
