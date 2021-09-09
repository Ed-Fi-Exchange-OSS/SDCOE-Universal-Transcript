const router = require('express').Router();

const usersController = require('../controllers/users');

const hashPassword = require('../middlewares/hashPassword');
const authenticate = require('../middlewares/authenticate');
const validateOldPassword = require('../middlewares/validateOldPassword');
const validateNewPassword = require('../middlewares/validateNewPassword');

router.post(
  '/change-password',
  authenticate,
  validateOldPassword,
  validateNewPassword,
  hashPassword,
  usersController.changePassword
);

module.exports = router;
