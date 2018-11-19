const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Piece = require("../models/piece"),
  Comment = require("../models/comment");

//Form to submit new comments
router.get("/new", isLoggedIn, function(req, res) {
  Piece.findById(req.params.id, function(err, piece) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { piece: piece });
    }
  });
});

//Posting new comment to DB
router.post("/", isLoggedIn, function(req, res) {
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
