const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepage');
const dashboardRoutes = require('./dashboard-routes');
const generatorRoutes = require('./generator-page-routes');

router.use('/generator', generatorRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homepageRoutes);


module.exports = router;