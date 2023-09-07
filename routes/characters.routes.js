const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/Character.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

// displays a form
router.get("/characters/create", isLoggedIn, (req, res) =>
  res.render("characters/create-character")
);

// create character
router.post(
  "/characters/create",
  fileUploader.single("character-image"),
  isLoggedIn,
  (req, res, next) => {
    const { name, occupation } = req.body;
    if (name === "" || occupation === "") {
      res.status(400).render("characters/create-character", {
        errorMessage: "This field is mandatory.",
      });

      return;
    }

    if (!req.file) {
      req.file = { path: "" };
      req.file.path =
        "https://www.google.com/search?q=starwars&sca_esv=562731675&rlz=1C1CHBD_deDE870DE870&tbm=isch&sxsrf=AB5stBiQynD6L1fKf0dxoQ1CwvDwKeFwNg:1693915142203&source=lnms&sa=X&ved=2ahUKEwiP9tHStZOBAxXpgf0HHQZtCg4Q_AUoAXoECAMQAw&biw=1745&bih=846&dpr=1.1#imgrc=eQt1KzluFOcgqM";
    }
    const newCharacter = {
      name: req.body.name,
      occupation: req.body.occupation,
      description: req.body.description,
      quotes: req.body.quotes,
      movie: req.body.movie,
      imageUrl: req.file.path,
    };

    Character.create(newCharacter)
      .then((newCharacter) => {
        res.redirect("/characters");
      })
      .catch((e) => {
        console.log("error creating new character", e);
        // next(e);
      });
  }
);

// display characters list
router.get("/characters", (req, res, next) => {
  const searchQuery = req.query.search;

  if (searchQuery) {
    // If a search query is provided:
    Character.find({ name: { $regex: searchQuery, $options: "i" } })
      .then((charactersFromBD) => {
        res.render("characters/characters-list", {
          charactersFromBD,
          searchQuery,
        });
      })
      .catch((e) => {
        console.log("error searching characters", e);
      });
  } else {
    // If no search query, display all characters
    Character.find()
      .then((charactersFromBD) => {
        res.render("characters/characters-list", { charactersFromBD });
      })
      .catch((e) => {
        console.log("error fetching characters", e);
      });
  }
});

// display details character
router.get("/characters/:Id", isLoggedIn, (req, res, next) => {
  const characterId = req.params.Id;

  Character.findById(characterId)
    .then((characterFromDB) => {
      const data = {
        character: characterFromDB,
      };
      res.render("characters/character-details", data);
    })
    .catch((e) => {
      console.log("error at character details ", e);
    });
});

// display edit form
router.get("/characters/:id/edit", isLoggedIn, (req, res, next) => {
  const characterId = req.params.id;
  Character.findById(characterId)
    .then((characterFromDB) => {
      const data = {
        character: characterFromDB,
      };
      res.render("characters/character-edit", data);
    })

    .catch((e) => {
      console.log("error at character edit ", e);
    });
});

// edit character
router.post(
  "/characters/:id/edit",
  fileUploader.single("character-image"),
  isLoggedIn,
  (req, res, next) => {
    const characterId = req.params.id;
    const { name, occupation, description, quotes, movie, existingImage } =
      req.body;
    if (name === "" || occupation === "") {
      res.status(400).render("characters/create-character", {
        errorMessage: "This field is mandatory.",
      });

      return;
    }

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
    Character.findByIdAndUpdate(
      characterId,
      { name, occupation, description, quotes, movie, imageUrl },
      { new: true }
    )
      .then((editedCharacter) => {
        res.redirect(`/characters/${characterId}`);
      })
      .catch((e) => {
        console.log("error at character edit ", e);
      });
  }
);

// delete character
router.post("/characters/:Id/delete", isLoggedIn, (req, res, next) => {
  const characterId = req.params.Id;
  Character.findByIdAndDelete(characterId)
    .then((characterToDelete) => {
      res.redirect("/characters");
    })
    .catch((e) => {
      console.log("error at character details ", e);
    });
});

module.exports = router;
