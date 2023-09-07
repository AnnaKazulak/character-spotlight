const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/Character.model");
const Movie = require("../models/Movie.model");
const fileUploader = require("../config/cloudinary.config");

const router = require("express").Router();

// display movie list
router.get("/movies", (req, res, next) => {
  const searchQuery = req.query.search;

  if (searchQuery) {
    // If a search query is provided:
    Movie.find({ title: { $regex: searchQuery, $options: "i" } })
      .then((moviesFromBD) => {
  
        res.render("movies/movies-list", {
         movies: moviesFromBD,
          searchQuery,
        });
      })
      .catch((e) => {
        console.log("error searching movies", e);
      });
  } else {
    Movie.find()
      .populate("characters")
      .then((moviesFromDB) => {
        const data = {
          movies: moviesFromDB,
        };
        res.render("movies/movies-list", data);
      })
      .catch((e) => {
        console.log("Error getting list of movies from DB", e);
        next(e);
      });
  }
});

// display form create movie
router.get("/movies/create", isLoggedIn, (req, res) =>
  Character.find()
    .then((charactersFromDB) => {
      const data = {
        characters: charactersFromDB,
      };
      res.render("movies/movie-create", data);
    })
    .catch((e) => {
      console.log("Error getting list of movies from DB", e);
    })
);

// create a movie
router.post(
  "/movies/create",
  fileUploader.single("movie-cover-image"),
  isLoggedIn,
  (req, res, next) => {
    const { title } = req.body;

    if (!req.file) {
      req.file = { path: "" };
      req.file.path =
        "https://www.google.com/search?q=starwars&sca_esv=562731675&rlz=1C1CHBD_deDE870DE870&tbm=isch&sxsrf=AB5stBiQynD6L1fKf0dxoQ1CwvDwKeFwNg:1693915142203&source=lnms&sa=X&ved=2ahUKEwiP9tHStZOBAxXpgf0HHQZtCg4Q_AUoAXoECAMQAw&biw=1745&bih=846&dpr=1.1#imgrc=eQt1KzluFOcgqM";
    }
    const newMovie = {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      characters: req.body.characters,
      imageUrl: req.file.path,
    };

    Movie.create(newMovie)
      .then((createdMovie) => {
        res.redirect("/movies");
      })
      .catch((e) => {
        Character.find().then((characters) => {
          console.log("Error creating movie: ", e.message);
          res.render("movies/movie-create", {
            characters: characters,
            errorMessage: e.message,
          });
        });
        // next(e);
      });
  }
);

// display movie details
router.get("/movie/:id", isLoggedIn, (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .populate("characters")
    .then((movieDetails) => {
      const data = {
        movie: movieDetails,
      };
      res.render("movies/movie-details", data);
    })
    .catch((e) => {
      console.log("Error creating movie", e);
      next(e);
    });
});

// display edit movie form
router.get("/movie/:id/edit", isLoggedIn, async (req, res, next) => {
  const movieID = req.params.id;
  try {
    const movie = await Movie.findById(movieID);
    const characters = await Character.find();
    const data = {
      movie,
      characters,
    };
    res.render("movies/movie-edit", data);
  } catch (e) {
    next(e);
  }
});

// edit movie
router.post(
  "/movie/:id/edit",
  isLoggedIn,
  fileUploader.single("movie-cover-image"),
  (req, res, next) => {
  
    const movieId = req.params.id;

    const { title, genre, plot, characters, existingImageMovie } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImageMovie;
    }
    Movie.findByIdAndUpdate(
      movieId,
      { title, genre, plot, characters, imageUrl },
      { new: true }
    )
      .then((updatedMovie) => {
        res.redirect("/movies");
      })
      .catch((e) => {
        console.log("Error in edit movie", e);
        res.redirect(`/movie/${movieId}/edit`);
      });
  }
);

router.get("/movies/:id/edit", async (req, res, next) => {
  const movieID = req.params.id;
  try {
    const movie = await Movie.findById(movieID);
    const characters = await Character.find();
    const data = {
      movie,
      characters,
    };

    res.render("movies/movie-edit", data);
  } catch (e) {
    next(e);
  }
});

// delete movie
router.post("/movie/:id/delete", isLoggedIn, (req, res, next) => {
  const movieID = req.params.id;
  Movie.findByIdAndDelete(movieID)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log("Error creating movie", e);
      next(e);
    });
});

module.exports = router;
