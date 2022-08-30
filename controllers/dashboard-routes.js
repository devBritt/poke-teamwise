const router = require("express").Router();
const games = require('../utils/poke-games');
const { getPokemonDetails } = require('../utils/poke-helpers');
const starterTeam = require('../utils/starter-team');
const sequelize = require("../config/connection");
const { Favorites, User, Team, Member } = require("../models");
const withAuth = require("../utils/auth");


router.use("/", async (req, res) => {
    //TODO get list of users's teams from db
    User.findOne ({
        where: {
            id: req.session.user_id,
        },
        include: [
            {
                model: Team,
                attributes: ['id', 'team_name'],
                include: {
                    model: Member,
                    attributes: ['id', 'team_id']
                }
            },
        ],
    })
    //TODO use first team from list of teams to fill in member tiles

    //get starter team member details 
    const members = {};

    members.member1 = await getPokemonDetails(starterTeam[0], 'legends-arceus', 1);
    members.member2 = await getPokemonDetails(starterTeam[1], 'legends-arceus', 2);
    members.member3 = await getPokemonDetails(starterTeam[2], 'legends-arceus', 3);
    members.member4 = await getPokemonDetails(starterTeam[3], 'legends-arceus', 4);
    members.member5 = await getPokemonDetails(starterTeam[4], 'legends-arceus', 5);
    members.member6 = await getPokemonDetails(starterTeam[5], 'legends-arceus', 6);

    const memberDetails = members[0];


    res.render('dashboard', { 
        loggedIn: req.session.loggedIn,
        games,
        members,
        memberDetails,
        // teams
    });
});

module.exports = router;
