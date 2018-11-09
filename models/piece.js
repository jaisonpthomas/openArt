const mongoose = require("mongoose");

const pieceSchema = new mongoose.Schema({
  title: String,
  artist: String,
  artform: String,
  year: Number,
  image: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

//const Piece = mongoose.model("Piece", pieceSchema);

module.exports = mongoose.model("Piece", pieceSchema);
