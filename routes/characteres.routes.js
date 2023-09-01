const Character = require("../models/Character.model");
const router = require("express").Router();

// displays a form
router.get("/characteres/create", (req, res) =>
  res.render("characteres/create-character")
);

router.post("/characteres/create"),
  (req, res, next) => {
    const newCharacter = {
      name: req.body.name,
      occupation: req.body.occupation,
      description: req.body.description,
      quotes: req.body.quotes,
      movie: req.body.movie,
    };

    Character.create(newCharacter)
      .then((newCharacter) => {
        res.send("hallow there")
        // res.render("/characteres");
      })
      .catch((e) => {
        next(e);
      });
  };



module.exports = router;
