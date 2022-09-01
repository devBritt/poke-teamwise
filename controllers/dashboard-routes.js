const router = require("express").Router();
const { getPokemonDetails } = require('../utils/poke-helpers');
const { Favorites, User, Team, Member } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
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
        console.log(teams);
        if (teams.length > 0) {
            //get members list
            const members = teams[0].members
            
            const membersDetails = {}

            membersDetails.member1 = await getPokemonDetails(members[0].pokemon_name, teams[0].game_id, 1);
            membersDetails.member2 = await getPokemonDetails(members[1].pokemon_name, teams[0].game_id, 2);
            membersDetails.member3 = await getPokemonDetails(members[2].pokemon_name, teams[0].game_id, 3);
            membersDetails.member4 = await getPokemonDetails(members[3].pokemon_name, teams[0].game_id, 4);
            membersDetails.member5 = await getPokemonDetails(members[4].pokemon_name, teams[0].game_id, 5);
            membersDetails.member6 = await getPokemonDetails(members[5].pokemon_name, teams[0].game_id, 6);

            //get first member to fill card
            const cardPokemon = membersDetails.member1;
            res.render('dashboard', { 
                loggedIn: req.session.loggedIn,
                hasTeams: true,
                membersDetails,
                teams,
                cardPokemon
            });
        } else {
            res.render('dashboard', {
                loggedIn: req.session.loggedIn,
                hasTeams: false
            });
        }
    });
});

module.exports = router;
