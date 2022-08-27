const router = require('express').Router();
const favoritesRoutes = require('./favorites-routes');
const userRoutes = require('./user-routes');
const teamRoutes = require('./team-routes');
const memberRoutes = require('./member-routes');

router.use('/favorite', favoritesRoutes);
<<<<<<< HEAD
router.use('/users', userRoutes);
=======
router.use('/user', userRoutes);
router.use('/team', teamRoutes);
router.use('/member', memberRoutes);
>>>>>>> e4415f49ec4c349955f37c853c20427dc764df2b

module.exports = router;