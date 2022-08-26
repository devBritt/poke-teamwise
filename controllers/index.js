const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard-routes');


// TODO: add team and member routes
router.use('/', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


module.exports = router;