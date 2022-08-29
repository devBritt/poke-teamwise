const poke_api = require('../utils/poke-api');
const games = require('../utils/poke-games');
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Favorites, User, Team } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", (req, res) => {
//   Favorites.findAll({
//     where: {
//       user_id: req.session.user_id,
//     },
//     attributes: ["id", "poke_id"],
//     include: [
//       {
//         model: Team,
//         attributes: ["id", "team_name", "poke_id"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbTeamData) => {
//       const teams = dbTeamData.map((team) => team.get({ plain: true }));
//       console.log(teams);
//       res.render("dashboard", { teams, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
    res.render('dashboard', { 
        games,
    });
});

router.get("/edit/:id", (req, res) => {});

module.exports = router;
