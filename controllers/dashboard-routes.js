const router = require('express').Router();
const sequelize = require('../config/connection');
const { Favorites, User, Team } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {

});

router.get('/edit/:id', (req, res) => {

});

module.exports = router;