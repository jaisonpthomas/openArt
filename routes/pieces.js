const express = require("express"),
  router = express.Router(),
  //bodyParser = require("body-parser"),
  Piece = require("../models/piece");
//Comment = require("./models/comment"),
//User = require("./models/user"),
//seedDB = require("./seeds");

//INDEX - show all pieces
router.get("/", isLoggedIn, function(req, res) {
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

//CREATE - create piece
router.post("/", isLoggedIn, function(req, res) {
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

//NEW - Show New Piece Form
router.get("/new", isLoggedIn, function(req, res) {
  res.render("pieces/new.ejs");
});

//SHOW - Show Individual Piece Detail Page
router.get("/:id", isLoggedIn, function(req, res) {
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
