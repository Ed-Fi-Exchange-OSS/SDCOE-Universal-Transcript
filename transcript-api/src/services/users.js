const userModel = require('../models/users.model');

const getUserByEmail = async (id) => {
  let user = await userModel.getUserByEmail(id);

  return user;
};

const addUser = async (user) => {
  let newUser = await userModel.addUser(user);

  return newUser;
};

const updateUser = async (id, user) => {
  let updatedUser = await userModel.updateUser(id, user);

  return updatedUser;
}

module.exports = {
  getUserByEmail,
  addUser,
  updateUser
};
