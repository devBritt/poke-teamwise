const router = require('express').Router();
const games = require('../utils/poke-games');
const { getPokemonDetails } = require('../utils/poke-helpers');
const starterTeam = require('../utils/starter-team');

router.use('/', async (req, res) => {
    const members = {};

    members.member1 = await getPokemonDetails(starterTeam[0], 'legends-arceus', 1, true);
    // members.member2 = await getPokemonDetails(starterTeam[1], 'legends-arceus', 2, false);
    // members.member3 = await getPokemonDetails(starterTeam[2], 'legends-arceus', 3, true);
    // members.member4 = await getPokemonDetails(starterTeam[3], 'legends-arceus', 4, false);
    // members.member5 = await getPokemonDetails(starterTeam[4], 'legends-arceus', 5, true);
    // members.member6 = await getPokemonDetails(starterTeam[5], 'legends-arceus', 6, false);
    
    res.render('generator-page', {
        loggedIn: req.session.loggedIn,
        games,
        members
    });
});

module.exports = router;