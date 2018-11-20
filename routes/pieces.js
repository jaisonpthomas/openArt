const express = require("express"),
  router = express.Router(),
  Piece = require("../models/piece");

//INDEX - show all pieces
router.get("/", isLoggedIn, function(req, res) {
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
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newPiece = {
    title: req.body.title,
    artist: req.body.artist,
    artform: req.body.artform,
    year: req.body.year,
    image: req.body.image,
    author: author
  };
  Piece.create(newPiece, function(err, piece) {
    if (err) {
      console.log("Piece.create - something Went Wrong");
    } else {
      console.log("Piece Created");
      console.log(piece);
      res.redirect("/pieces");
    }
  });
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

//EDIT - Update Form
router.get("/:id/edit", isLoggedIn, function(req, res) {
  Piece.findById(req.params.id, function(err, foundPiece) {
    if (err) {
      console.log("EDIT ERROR");
      console.log(err);
    } else {
      res.render("pieces/edit", { piece: foundPiece });
    }
  });
});
//UPDATE - Post Update to DB
router.put("/:id", isLoggedIn, function(req, res) {
  Piece.findByIdAndUpdate(req.params.id, req.body.piece, function(
    err,
    foundPiece
  ) {
    if (err) {
      console.log("UPDATE error");
      console.log(err);
    } else {
      res.redirect("/pieces/" + req.params.id);
    }
  });
});

//DESTROY
router.delete("/:id", isLoggedIn, function(req, res) {
  Piece.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("Delete Error");
      console.log("err");
    } else {
      res.redirect("/pieces");
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
