// ------------------------------------------------------------------------
// BlackBox (SQL Version) – Routes for Level 1: Register/Login
// This file defines routes for rendering views and delegating logic
// to the controller for registration and login.
// ------------------------------------------------------------------------

import express from "express";
import {
  renderHome,
  renderLogin,
  renderRegister,
  handleRegister,
  handleLogin,
} from "../controllers/secretController.js";

const router = express.Router();

// Static GET pages
router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/register", renderRegister);

// POST form handlers
router.post("/register", handleRegister);
router.post("/login", handleLogin);

export default router;
