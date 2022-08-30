const router = require('express').Router();
const favoritesRoutes = require('./favorites-routes');
const userRoutes = require('./user-routes');
const teamRoutes = require('./team-routes');
const memberRoutes = require('./member-routes');
const pokemonRoutes = require('./pokemon');

router.use('/favorite', favoritesRoutes);
router.use('/user', userRoutes);
router.use('/team', teamRoutes);
router.use('/member', memberRoutes);
router.use('/pokemon', pokemonRoutes);


module.exports = router;