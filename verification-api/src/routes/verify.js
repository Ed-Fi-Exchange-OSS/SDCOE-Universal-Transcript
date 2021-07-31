const { Router } = require('express');

const uploadStorge = require('../utils/multer-storage');
const verificationController = require('../controllers/verify');

const verificationRouter = Router();

verificationRouter.post('/', uploadStorge.single('transcript-pdf'), verificationController);

module.exports = verificationRouter;
