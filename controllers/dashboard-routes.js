const poke_api = require('../utils/poke-api');
const games = require('../utils/poke-games');
const router = require("express").Router();
const sequelize = require("../config/connection");
const { Favorites, User, Team } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", (req, res) => {

    res.render('dashboard', { 
        loggedIn: req.session.loggedIn,
        games,
    });
});

router.get("/edit/:id", (req, res) => {});

module.exports = router;
