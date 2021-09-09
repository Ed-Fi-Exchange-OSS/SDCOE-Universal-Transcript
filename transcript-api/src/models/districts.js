const db = require('../db');
const TABLE_NAME = 'districts';

const getAllDistricts = async () => {
  return await db(TABLE_NAME)
    .select();
}

const getDistrict = async (id) => {
  return await db(TABLE_NAME)
    .select()
    .where('id', id);
}

module.exports = {
  getAllDistricts,
  getDistrict
}
