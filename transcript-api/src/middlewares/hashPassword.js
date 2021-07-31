const bcrypt = require('bcrypt');
/*
 * hash the string validated password
 * add the updated password in the request
 */
const hashPassword = async (req, res, next) => {
  try {
    // Generating Hash
    const saltFactor = Number(process.env.SALT_FACTOR);
    const salt = await bcrypt.genSalt(saltFactor);
    const hashedPassword = await bcrypt.hash(req.password, salt);
    const newPassword = {
      password: hashedPassword,
    };

    req.user = newPassword;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = hashPassword;
