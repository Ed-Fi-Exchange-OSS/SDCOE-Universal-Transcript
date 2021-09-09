const userService = require('../services/users');
const logger = require('../utils/logger').default;

const changePassword = async (req, res, next) => {
  const { id, user } = req;

  try {
    await userService.updateUser(id, { ...user, has_logged_in: 1 });

    return res.status(201).json({
      messages: 'User password updated successfully.',
    });
  } catch (err) {
    logger.error('Update user error', err);
    return res.status(500).json({ error: 'Unable to update user. ' + err });
  }
};

module.exports = { changePassword };
