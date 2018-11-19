const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  seedDB = require("./seeds");

//Required Routes
const commentRoutes = require("./routes/comments"),
  pieceRoutes = require("./routes/pieces"),
  indexRoutes = require("./routes/index");

//Database Setup and Seed
mongoose.connect("mongodb://localhost/openArt");
seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//User Auth and Session Information
app.use(
  require("express-session")({
    secret: "Impressionist Art",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//Routes
app.use(indexRoutes);
app.use("/pieces", pieceRoutes);
app.use("/pieces/:id/comments", commentRoutes);

app.listen(3000, function() {
  console.log("Art Server Started...");
});
