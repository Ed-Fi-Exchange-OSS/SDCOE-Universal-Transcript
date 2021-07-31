const router = require("express").Router();

const districtController = require('../controllers/districts');

router.get('/', districtController.getAllDistricts);
router.get('/:id', districtController.getDistrict);

module.exports = router;
