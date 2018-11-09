const garbage = {
  Piece.create(
    {
      title: "Green Wheat Fields, Auvers",
      artist: "Vincent Van Gogh",
      artform: "Painting",
      year: 1890,
      image:
        "https://images.nga.gov/?service=asset&action=show_preview&asset=149138"
    },
    function(err, piece) {
      if (err) {
        console.log("ERROR");
        console.log(err);
      } else {
        console.log("Successful Create!");
        console.log(piece);
      }
    }
  );
  
  Piece.create(
    {
      title: "The Japanese Footbridge",
      artist: "Claude Monet",
      artform: "Painting",
      year: 1899,
      image:
        "https://images.nga.gov/?service=asset&action=show_preview&asset=149269"
    },
    function(err, piece) {
      if (err) {
        console.log("ERROR");
        console.log(err);
      } else {
        console.log("Successful Create!");
        console.log(piece);
      }
    }
  );