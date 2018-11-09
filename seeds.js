//Seed Database

const mongoose = require("mongoose"),
  User = require("./models/user"),
  Piece = require("./models/piece"),
  Comment = require("./models/comment");

const data = [
  {
    title: "Green Wheat Fields, Auvers",
    artist: "Vincent Van Gogh",
    artform: "Painting",
    year: 1890,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149138"
  },
  {
    title: "Roses",
    artist: "Vincent Van Gogh",
    artform: "Painting",
    year: 1890,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149267"
  },
  {
    title: "The Olive Orchard",
    artist: "Vincent Van Gogh",
    artform: "Painting",
    year: 1889,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149025"
  },

  {
    title: "Self-Portrait",
    artist: "Vincent Van Gogh",
    artform: "Painting",
    year: 1889,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149207"
  },

  {
    title: "The Japanese Footbridge",
    artist: "Claude Monet",
    artform: "Painting",
    year: 1899,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149269"
  },
  {
    title: "The Bridge at Argenteuil",
    artist: "Claude Monet",
    artform: "Painting",
    year: 1874,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149254"
  },
  {
    title: "Jerusalem Artichoke Flowers",
    artist: "Claude Monet",
    artform: "Painting",
    year: 1880,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=148761"
  },
  {
    title: "The Houses of Parliament, Sunset",
    artist: "Claude Monet",
    artform: "Painting",
    year: 1903,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=148680"
  },
  {
    title: "View of Monte Carlo from Cap Martin",
    artist: "Auguste Renoir",
    artform: "Painting",
    year: 1884,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=148764"
  },
  {
    title: "Peaches on a Plate",
    artist: "Auguste Renoir",
    artform: "painting",
    year: 1902,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149084"
  },
  {
    title: "Landscape Between Storms",
    artist: "Auguste Renoir",
    artform: "Painting",
    year: 1874,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=86431"
  },
  {
    title: "Tropical Forest with Monkeys",
    artist: "Henri Rousseau",
    artform: "painting",
    year: 1910,
    image:
      "https://images.nga.gov/?service=asset&action=show_preview&asset=149734"
  }
];

function seedDB() {
  //Clear DB
  Comment.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Comments purged");
    }
  });
  User.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Users purged");
    }
  });
  Piece.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Piece Database Emptied");
      data.forEach(function(seed) {
        Piece.create(seed, function(err, piece) {
          if (err) {
            console.log(err);
          } else {
            console.log("Piece Added to OpenArt");
            Comment.create(
              {
                text: "A reminder that life is beautiful.",
                author: "Anonymous"
              },
              function(err, comment) {
                if (err) {
                  console.log("Comment creation error");
                } else {
                  piece.comments.push(comment);
                  piece.save();
                  console.log("Comment created on " + piece.title);
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = seedDB;
