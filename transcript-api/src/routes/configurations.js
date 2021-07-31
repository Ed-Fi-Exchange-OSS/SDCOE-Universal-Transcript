const router = require("express").Router();

const configurationController = require('../controllers/configuration');

router.get('/', configurationController.getConfigurations);

module.exports = router;
