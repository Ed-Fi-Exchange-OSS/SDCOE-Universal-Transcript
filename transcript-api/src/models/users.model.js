const db = require('../db');
const TABLE_NAME = 'users';

const getUserByEmail = async (email) => {
  return await db(TABLE_NAME)
    .select()
    .where('email_address', email);
}

const addUser = async (user) => {
  return await db(TABLE_NAME)
    .returning('*')
    .insert(user);
}

const updateUser = async (id, user) => {
  return await db(TABLE_NAME)
    .where({ user_id: id })
    .update(user)
}

module.exports = {
  getUserByEmail,
  addUser,
  updateUser
}
