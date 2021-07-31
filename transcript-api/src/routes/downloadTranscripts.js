const router = require("express").Router();

const downloadController = require('../controllers/downloadTranscripts');

router.get('/', downloadController.downloadTranscript);

module.exports = router;
