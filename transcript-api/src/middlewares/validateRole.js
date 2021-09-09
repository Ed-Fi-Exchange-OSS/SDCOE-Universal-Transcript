const { ROLES } = require('../constants/role');
const { default: ForbiddenError } = require('../errors/forbidden');

const validateRole = (req, res, next) => {
  const { role, cdsCode } = req;

  // will only pass if role is staff or district
  if (role !== ROLES.DISTRICT && role !== ROLES.STAFF) {
    next(new ForbiddenError('Invalid Role'))
  }

  if (role === ROLES.DISTRICT && !cdsCode) {
    next(new ForbiddenError('Invalid CDS Code'))
  }

  next();
};

module.exports = validateRole;
