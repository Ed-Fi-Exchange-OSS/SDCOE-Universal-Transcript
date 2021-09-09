const jwt = require('jsonwebtoken');
const { getFileContent } = require('../utils/file');

const { default: TokenError } = require('../errors/token');

/*
  * Validate the reset token before resetting password.
*/
const validateResetToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    const jwtKey = getFileContent(process.env.JWT_TOKEN_SECRET_KEY_FILE);
    const decoded = jwt.verify(token, jwtKey);
    req.id = decoded.id;
    
    next();
  } catch (err) {
    next(new TokenError('JWT Token Invalid'));
  }
};

module.exports = validateResetToken;
