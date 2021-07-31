const jwt = require('jsonwebtoken');
const sql = require('mssql');

require('../env');
const knexJs = require('knex');
const knexConfig = require('../knexfile');

const argv = require('minimist')(process.argv.slice(2));

const { emailer } = require('../utils/email');
const logger = require('../utils/logger').default;
const { getFileContent } = require('../utils/file');

const connectToSQL = () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
  };

  return sql.connect(config);
};

const getKnex = () => {
  return knexJs(knexConfig);
};

/*
  to send an email with reset link
*/
(async () => {
  const { email } = argv;

  if (!email) {
    logger.error('Email flag is required.');
    process.exit();
  }

  try {
    const userSql = `SELECT * FROM users WHERE email_address='${email}'`;

    let user = [];

    if (process.platform === 'win32') {
      // Windows
      await connectToSQL();
      const db = new sql.Request();

      const newUser = await db.query(userSql);

      const { recordset } = newUser;

      user = recordset[0];
    } else {
      // Linux
      const db = getKnex();

      const newUser = await db.raw(userSql);
      const { rows } = newUser;

      user = rows[0];
    }

    if (!user) {
      logger.error(`User with email ${email} is not registered yet.`);
      process.exit();
    }

    const payload = {
      id: user.user_id,
      email: user.email_address,
    };

    const jwtKey = getFileContent(process.env.JWT_TOKEN_SECRET_KEY_FILE);
    // Reset link send by admin expires in 1day
    const token = jwt.sign(payload, jwtKey, { expiresIn: '86400s' });

    if (token) {
      const link = `${process.env.APP_RESET_PASSWORD_LINK}?token=${token}`;
      const resetPasswordTemplate = 'RESET_PASSWORD';

      await emailer('Password Reset', user.email_address, resetPasswordTemplate, link);
    }

    logger.info(`Email with reset link is sent to email ${email}.`);
  } catch (err) {
    logger.error('Unable to send email to new users', err);
    process.exit();
  }
})();
