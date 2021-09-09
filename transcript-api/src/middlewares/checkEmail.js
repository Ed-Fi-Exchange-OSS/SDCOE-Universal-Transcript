const { default: RowNotFoundError } = require('../errors/rownotfound');

const userService = require('../services/users');

/*
 * Check the email address
 * add user id information to the request.
 */
const checkEmail = async (req, res, next) => {
  try {
    const email = req.body.email_address;
    // Get User Info
    const user = await userService.getUserByEmail(email);

    if (!user.length) {
      next(new RowNotFoundError('User does not exist.'));
    }
    
    req.id = user[0].user_id;
    next();

  } catch (err) {
    next(err);
  }
};

module.exports = checkEmail;
