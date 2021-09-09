const https = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');

const { emailer } = require('../utils/email');
const logger = require('../utils/logger').default;
const { getFileContent } = require('../utils/file');

const userService = require('../services/users');

const { default: AuthenticationError } = require('../errors/authentication');

const validateToken = async (idToken) => {
  const decoded = await jwt.decode(idToken, { complete: true });
  const { header } = decoded;

  const response = await https.get(process.env.JWKS_URI);
  const jwk = response.data.keys.filter((item) => item.kid === header.kid);

  let isValid = false;

  const pem = await jwkToPem(jwk[0]);

  jwt.verify(idToken, pem, { algorithms: [header.alg] }, (err, decodedToken) => {
    if (err) {
      logger.error('Error validating the token', err);
    }

    if (decodedToken) {
      isValid = true;
    } else {
      logger.error('Could not verify the token');
      throw new Error('Could not verify the token');
    }
  });

  return isValid;
};

const getToken = (user, type) => {
  const payload = {
    email: user.email_address,
    name: `${user.first_name} ${user.last_name}`,
    role: user.role,
    cdsCode: user.CDS_code,
    hasLoggedIn: user.has_logged_in,
    type: type
  };

  const jwtKey = getFileContent(process.env.JWT_SECRET_KEY_FILE);
  const token = jwt.sign(payload, jwtKey, { expiresIn: '86400s' });

  return token;
}

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers['access-token'];
    const idToken = req.headers['id-token'];

    const decoded = await jwt.decode(idToken, { complete: true });
    const { payload } = decoded;

    const { preferred_username, name } = payload;

    const isValid = await validateToken(idToken);

    if (isValid) {
      const user = await userService.getUserByEmail(preferred_username);

      if (user && user.length) {
        const token = getToken(user[0], 'MICROSOFT');

        res.status(200).json({
          token: token,
          name: name,
        });
      } else {
        res.status(404).json({
          messages: `You don't seem to have access to the system. Please contact your administrator.`,
        });
      }
    } else {
      res.status(401).json({
        messages: 'Token validation failure',
      });
    }
  } catch (e) {
    logger.error('Login Error', e);
    res.status(500).json({ error: 'Unable to login. Token validation failure.' });
  }
};

const basicAuth = async (req, res, next) => {
  const requestedUser = req.body;
  const user = await userService.getUserByEmail(requestedUser.email_address);

  if (user.length === 0) {
    return res.status(404).json({
      messages: `You don't seem to have access to the system. Please contact your administrator.`,
    });
  }

  try {
    const isValid = await bcrypt.compare(requestedUser.password, user[0].password);
    if (isValid) {
      const token = getToken(user[0], 'BASIC');

      return res.status(200).json({
        token: token,
        name: `${user[0].first_name} ${user[0].last_name}`,
      });
    }
    else {
      next(new AuthenticationError('Invalid username or password'));
    }
  } catch (err) {
    next(err);
  }
};

const getPasswordResetLink = async (req, res, next) => {
  const email = req.body.email_address;
  const token = req.token;
  const link = `${process.env.APP_RESET_PASSWORD_LINK}?token=${token}`;

  try {
    const resetPasswordTemplate = 'RESET_PASSWORD';
    const emailInfo = await emailer('Password Reset', email, resetPasswordTemplate, link);

    if (emailInfo) {
      return res.status(200).json({
        status: 1,
        messages: 'Email sent successfully.',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  auth,
  basicAuth,
  getPasswordResetLink,
};
