const router = require('express').Router();

const usersRoutes = require('./users');
const loginRoutes = require('./login');
const ordersRoutes = require('./orders');
const ropRoutes = require('./ropTranscript');
const districtRoutes = require('./districts');
const configRoutes = require('./configurations');
const downloadRoutes = require('./downloadTranscripts');

router.use('/auth', loginRoutes);
router.use('/users', usersRoutes);
router.use('/config', configRoutes);
router.use('/orders', ordersRoutes);
router.use('/rop-courses', ropRoutes);
router.use('/districts', districtRoutes);
router.use('/transcript', downloadRoutes);

module.exports = router;
