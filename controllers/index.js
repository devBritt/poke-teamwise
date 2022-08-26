const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepage');



router.use('/', homepageRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);


module.exports = router;