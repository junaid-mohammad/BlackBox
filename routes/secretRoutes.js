// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Routes for Level 4: Sessions and Cookies
// Delegates GET/POST routes to the controller and passport auth.
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

// Static Pages
router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/secrets", renderSecrets);

// Registration form POST
router.post("/register", handleRegister);

// Login form POST using passport-local
router.post("/login", passport.authenticate("local", {
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
