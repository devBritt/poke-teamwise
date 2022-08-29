const router = require('express').Router();

router.use('/', (req, res) => {
    res.render('generator-page', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;