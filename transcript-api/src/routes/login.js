const router = require('express').Router();

const loginController = require('../controllers/login');
const usersController = require('../controllers/users');

const checkEmail = require('../middlewares/checkEmail');
const hashPassword = require('../middlewares/hashPassword');
const generateResetToken = require('../middlewares/resetToken');
const validateResetToken = require('../middlewares/validateResetToken');
const validateNewPassword = require('../middlewares/validateNewPassword');

// Login
router.get('/callback/microsoft', loginController.auth);
router.post('/basic', loginController.basicAuth);

// Password
router.post('/forget-password', checkEmail, generateResetToken, loginController.getPasswordResetLink);
router.post('/reset-password', validateResetToken, validateNewPassword, hashPassword, usersController.changePassword);

module.exports = router;
