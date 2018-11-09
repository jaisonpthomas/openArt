const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Piece = require("./models/piece"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/openArt");
seedDB();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Impressionist Art",
    resave: false,
    saveUninitialized: false
  })
);

//===========================
//AUTH ROUTES
//===========================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
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

app.get("/login", function(req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/pieces",
    failureRedirect: "/register"
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
//===========================
//ARTPIECE ROUTES
//===========================

//Landing
app.get("/", function(req, res) {
  if (req.user) {
    res.render("/pieces");
  } else {
    res.render("landing");
  }
});

//INDEX - show all objects
app.get("/pieces", isLoggedIn, function(req, res) {
  console.log(req.user);
  Piece.find({}, function(err, pieces) {
    if (err) {
      console.log("/pieces GET error");
      console.log(err);
    } else {
      res.render("pieces/index", { pieces: pieces });
    }
  });
});

//CREATE - creae objects
app.post("/pieces", isLoggedIn, function(req, res) {
  Piece.create(
    {
      title: req.body.title,
      artist: req.body.artist,
      artform: req.body.artform,
      year: req.body.year,
      image: req.body.image
    },
    function(err, piece) {
      if (err) {
        console.log("Something Went Wrong");
      } else {
        console.log("Piece Created");
        console.log(piece);
        res.redirect("/pieces");
      }
    }
  );
});

//NEW - show form
app.get("/pieces/new", isLoggedIn, function(req, res) {
  res.render("pieces/new.ejs");
});

//SHOW - show individual piece details
app.get("/pieces/:id", isLoggedIn, function(req, res) {
  Piece.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundPiece) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundPiece);
        res.render("pieces/show", { piece: foundPiece });
      }
    });
});

//===========================
//COMMENT ROUTES
//===========================

app.get("/pieces/:id/comments/new", isLoggedIn, function(req, res) {
  //res.render("comments/new");
  Piece.findById(req.params.id, function(err, piece) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { piece: piece });
    }
  });
});

app.post("/pieces/:id/comments", isLoggedIn, function(req, res) {
  Piece.findById(req.params.id, function(err, piece) {
    if (err) {
      console.log(err);
      res.redirect("/pieces");
    } else {
      console.log(req.body.comment);
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          piece.comments.push(comment);
          piece.save();
          res.redirect("/pieces/" + piece._id);
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Art Server Started...");
});
