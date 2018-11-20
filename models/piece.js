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
  ],
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});

module.exports = mongoose.model("Piece", pieceSchema);
