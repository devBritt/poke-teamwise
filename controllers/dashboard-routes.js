const router = require("express").Router();
const games = require('../utils/poke-games');
const { getPokemonDetails } = require('../utils/poke-helpers');
const starterTeam = require('../utils/starter-team');
const sequelize = require("../config/connection");
const { Favorites, User, Team, Member } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", async (req, res) => {
    Team.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        attributes: ['id', 'team_name', 'game_id'],
        include: [
            {
                model: Member,
                attributes: ['team_id', 'pokemon_name'],
            }
        ]
    })
    .then( async (dbTeamData) => {
        const teams = dbTeamData.map((team) => team.get({plain :true}))
        
        //get members list
        const members = teams[0].members
        
        const membersDetails = {}

        membersDetails.member1 = await getPokemonDetails(members[0], teams.game_id, 1);
        membersDetails.member1 = await getPokemonDetails(members[0], teams.game_id, 1);
        membersDetails.member1 = await getPokemonDetails(members[0], teams.game_id, 1);
        membersDetails.member1 = await getPokemonDetails(members[0], teams.game_id, 1);
        membersDetails.member1 = await getPokemonDetails(members[0], teams.game_id, 1);
        membersDetails.member1 = await getPokemonDetails(members[0], teams.game_id, 1);

        //get first member to fill card
        const firstMember = members[0];
        console.log(members)
        res.render('dashboard', { 
            loggedIn: req.session.loggedIn,
            membersDetails,
            teams,
            firstMember
        });
    })
});

module.exports = router;
