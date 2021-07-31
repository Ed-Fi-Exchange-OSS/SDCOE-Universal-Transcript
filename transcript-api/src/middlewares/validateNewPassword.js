// Strong Password: The password has to meet all the requirements.

const { default: ValidationError } = require('../errors/validation');

// has at least one lowercase letter (?=.*[a-z]), one uppercase letter (?=.*[A-Z]), one digit (?=.*[0-9]), one special character (?=.*[^A-Za-z0-9]), and is at least eight characters long(?=.{8,})
const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

const validateNewPassword = async (req, res, next) => {
  const { new_password, confirm_password } = req.body;

  if (new_password !== confirm_password) {
    next(new ValidationError('Password mismatch'));
  }

  if(!strongPassword.test(new_password)) {
    next(new ValidationError('Password must be 8 character long, have at least one lowercase, one uppercase, one digit and a special character.'));
  }

  req.password = new_password;
  next();
};

module.exports = validateNewPassword;
