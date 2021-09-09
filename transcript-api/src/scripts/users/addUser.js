const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const userService = require('../../services/users');

const addUser = async (user) => {
  try {
    const saltFactor = Number(process.env.SALT_FACTOR);
    const salt = await bcrypt.genSalt(saltFactor);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    user.user_id = uuidv4();

    const userInfo = await userService.addUser(user);
    // Todo: Send Email with reset password link
    console.log('User Added Successfully', userInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = addUser;
