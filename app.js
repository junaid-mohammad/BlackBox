// app.js - Main server configuration file for the Secrets Authentication Project
// This file sets up Express, handles MongoDB via Mongoose, implements user authentication using Passport.js,
// supports multiple levels of auth including Google OAuth 2.0, and defines routing logic for the web app.

// ------------------------------
// Environment and Dependencies
// ------------------------------
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

// ------------------------------
// View Engine and Middleware
// ------------------------------
app.set('view engine', 'ejs'); // Use EJS as the template engine

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from "public" directory
app.use(express.static("public"));

// Configure session middleware for tracking login sessions
app.use(session({
  secret: 'keyboard cat', // Secret key for encrypting session data
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport for authentication handling
app.use(passport.initialize());
app.use(passport.session());

// ------------------------------
// Database Configuration
// ------------------------------
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("strictQuery", true); // Ensure strict query interpretation

// ------------------------------
// User Schema and Authentication Setup
// ------------------------------
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

// Add plugins to the user schema for easy username/password setup and findOrCreate logic
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// Create User model
const User = new mongoose.model("User", userSchema);

// Use passport-local strategy for local username/password login
passport.use(User.createStrategy());

// Serialization for storing user info in session
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

// Deserialization for fetching user info from session
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// ------------------------------
// Google OAuth Strategy
// ------------------------------
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Find or create user using their Google profile ID
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// ------------------------------
// Routes - GET
// ------------------------------
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

// Callback route after successful Google login
app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }), 
  function(req, res) {
    res.redirect("/secrets");
  }
);

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/secrets", function(req, res) {
  // Find all users who have submitted secrets (non-null secret field)
  User.find({ "secret": { $ne: null } }, function(err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
});

app.get("/submit", function(req, res) {
  // Only allow access if user is authenticated
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res) {
  // Logout the user and end session
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

// ------------------------------
// Routes - POST
// ------------------------------
app.post("/register", function(req, res) {
  // Register a new user with username/password
  User.register({ username: req.body.username }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      // Automatically log in the user upon successful registration
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", function(req, res) {
  // Log in an existing user using Passport
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/submit", function(req, res) {
  // Handle submission of a secret
  const submittedSecret = req.body.secret;

  // Add the secret to the current user's record
  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function() {
          res.redirect("/secrets");
        });
      }
    }
  });
});

// ------------------------------
// Server Startup
// ------------------------------
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
