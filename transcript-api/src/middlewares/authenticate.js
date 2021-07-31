const jwt = require('jsonwebtoken');

const { getFileContent } = require('../utils/file');

const { default: TokenError } = require('../errors/token');

const authenticate = (req, res, next) => {
  // get the token from the header if present
  let token = req.headers.authorization;

  token = token && token.split(' ')[1];

  // if no token found, return response (without going to the next middleware)
  if (!token) {
    return res.status(401).json({
      status: 'Un-authorized',
      message: 'Access denied. No token provided.',
    });
  }

  try {
    // if can verify the token, set req.user and pass to next middleware
    const jwtKey = getFileContent(process.env.JWT_SECRET_KEY_FILE);
    const decoded = jwt.verify(token, jwtKey);
    const { email, role, cdsCode } = decoded;

    req.email = email;
    req.role = role;
    req.cdsCode = cdsCode;

    next();
  } catch (err) {
    // if invalid token
    next(new TokenError('JWT Token Invalid'));
  }
};

module.exports = authenticate;
