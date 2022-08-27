const router = require('express').Router();
const favoritesRoutes = require('./favorites-routes');
const userRoutes = require('./user-routes');

router.use('/favorite', favoritesRoutes);
router.use('/users', userRoutes);

module.exports = router;