const bcrypt = require('bcrypt');

const userService = require('../services/users');

const { default: AuthenticationError } = require('../errors/authentication');

/*
 * Validate the old password against the password in the database.
 * add user id information to the request.
 */
const validateOldPassword = async (req, res, next) => {
  try {
    // Get User Info
    const user = await userService.getUserByEmail(req.email);
    const { current_password } = req.body;

    // Validates the password
    const isValid = await bcrypt.compare(current_password, user[0].password);
    if (isValid) {
      req.id = user[0].user_id;
      next();
    } else {
      next(new AuthenticationError('Invalid password'));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = validateOldPassword;
