const { ROLES } = require('../constants/role');
const { default: ForbiddenError } = require('../errors/forbidden');

const authorizeStaff = (req, res, next) => {
  const { role, cdsCode } = req;

  // will only pass if role is staff
  if (role === ROLES.DISTRICT && cdsCode) {
    next(new ForbiddenError('Access denied. Unauthorized for district users.'))
  }

  next();
};

module.exports = authorizeStaff;
