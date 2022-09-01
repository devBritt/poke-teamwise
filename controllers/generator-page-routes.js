const router = require('express').Router();
const games = require('../utils/poke-games');
const { getPokemonDetails, getAllMoves, getAllTypes } = require('../utils/poke-helpers');
const starterTeam = require('../utils/starter-team');

router.get('/', async (req, res) => {
    // get starter team member details
    const members = {};

    members.member1 = await getPokemonDetails(starterTeam[0], 30, 1);
    members.member2 = await getPokemonDetails(starterTeam[1], 30, 2);
    members.member3 = await getPokemonDetails(starterTeam[2], 30, 3);
    members.member4 = await getPokemonDetails(starterTeam[3], 30, 4);
    members.member5 = await getPokemonDetails(starterTeam[4], 30, 5);
    members.member6 = await getPokemonDetails(starterTeam[5], 30, 6);

    const cardPokemon = members.member1;

    // get all types
    const types = await getAllTypes();

    // get all moves
    const moves = await getAllMoves();
    
    res.render('generator-page', {
        loggedIn: req.session.loggedIn,
        games,
        types,
        moves,
        members,
        cardPokemon
    });
});

module.exports = router;