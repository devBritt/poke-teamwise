const router = require('express').Router();
const games = require('../utils/poke-games');


router.use('/', async (req, res) => {

    
    res.render('generator-page', {
        loggedIn: req.session.loggedIn,
        games
    });
});

module.exports = router;