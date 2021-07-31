const jwt = require('jsonwebtoken');

const { getFileContent } = require('../utils/file');

/*
 * Generate the reset token
 * add the token to the request.
 */
const generateResetToken = (req, res, next) => {
  try {
    const id = req.id;
    const email = req.body.email_address;

    const payload = {
      id: id,
      email: email,
    };

    const jwtKey = getFileContent(process.env.JWT_TOKEN_SECRET_KEY_FILE);
    // Reset link expires in 10mins requested by user themselves
    const token = jwt.sign(payload, jwtKey, { expiresIn: '600s' });

    if (token) {
      req.token = token;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = generateResetToken;
