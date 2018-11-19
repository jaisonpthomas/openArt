const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

//Landing Page
router.get("/", function(req, res) {
  if (req.user) {
    res.render("/pieces/index");
  } else {
    res.render("landing");
  }
});

//Registration Routes
router.get("/register", function(req, res) {
  res.render("register");
});
router.post("/register", function(req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/pieces");
    });
  });
});

//Login Routes
router.get("/login", function(req, res) {
  res.render("login");
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/pieces",
    failureRedirect: "/register"
  })
);

//Logout
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
