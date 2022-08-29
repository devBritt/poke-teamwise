const router = require('express').Router();
const poke_api = require('../utils/poke-api');
const games = require('../utils/poke-games');

router.use('/', async (req, res) => {
    // get list of types for type select
    const types = await poke_api.getAllTypes();
    const moves = await poke_api.getAllMoves();

    res.render('generator-page', {
        loggedIn: req.session.loggedIn,
        games,
        types,
        moves
    });
});

module.exports = router;