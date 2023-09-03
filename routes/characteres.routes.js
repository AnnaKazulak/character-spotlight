const Character = require("../models/Character.model");
const router = require("express").Router();

// displays a form
router.get("/characteres/create", (req, res) =>
  res.render("characteres/create-character")
);

router.post("/characteres/create", (req, res, next) => {
  console.log(req.body);
  const newCharacter = {
    name: req.body.name,
    occupation: req.body.occupation,
    description: req.body.description,
    quotes: req.body.quotes,
    movie: req.body.movie,
  };

  Character.create(newCharacter)
    .then((newCharacter) => {
      console.log(newCharacter);
      res.redirect("/characteres");
    })
    .catch((e) => {
      console.log("error creating new character", e);
      // next(e);
    });
});

// display character list
router.get("/characteres", (req, res, next) => {
  Character.find().then((characteresFromBD) => {
    console.log(characteresFromBD);
    res.render("characteres/characteres-list", { characteresFromBD });
  });
});

// see details character
router.get("/characteres/:Id", (req, res, next) => {
  const characterId = req.params.Id;

  Character.findById(characterId)
    .then((characterFromDB) => {
      const data = {
        character: characterFromDB,
      };
      res.render("characteres/character-details", data);
    })
    .catch((e) => {
      console.log("error at character details ", e);
    });
});

// delete character
router.post("/characteres/:Id/delete", (req, res, next) => {
  const characterId = req.params.Id;
  Character.findByIdAndDelete(characterId)
    .then((characterToDelete) => {
      res.redirect("/characteres");
    })
    .catch((e) => {
      console.log("error at character details ", e);
    });
});

module.exports = router;
