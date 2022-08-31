const router = require("express").Router();
const { Favorites, User, Team } = require("../../models");

//route to find all favorites
router.get("/", (req, res) => {
  Favorites.findAll({
    attributes: ["id", "poke_id"],
    include: [
      {
        model: Team,
        attributes: ["id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbFavoritesData) => res.json(dbFavoritesData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route to find favorite by id
router.get("/:id", (req, res) => {
  Favorites.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "poke_id"],
    include: [
      {
        model: Team,
        attributes: ["id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbFavoritesData) => res.json(dbFavoritesData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route to create favorite
router.post("/", (req, res) => {
  Favorites.create({
    poke_id: req.body.poke_id,
    user_id: req.session.user_id,
    team_id: req.body.team_id,
  })
    .then((dbFavoritesData) => res.json(dbFavoritesData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route to update favorite by id
router.put("/:id", (req, res) => {
  Favorites.update(
    {
      poke_id: req.body.poke_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbFavoritesData) => {
      if (!dbFavoritesData) {
        res
          .status(404)
          .json({ message: "There is no favorite found by this id" });
        return;
      }
      res.json(dbFavoritesData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//route to delete a favorite by id
router.delete("/:id", (req, res) => {
  Favorites.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbFavoritesData) => {
      if (!dbFavoritesData) {
        res
          .status(404)
          .json({ message: "There was no favorite pokemon by this id" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// module.exports = router;
