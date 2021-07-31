const db = require('../db');
const TABLE_NAME = 'requests';

const getAllOrders = async () => {
  return await db(TABLE_NAME)
    .select()
    .orderBy('updated_at', 'desc');
}

const addOrder = async (data) => {
  return await db(TABLE_NAME)
    .insert(data);
}

const getOrder = async (id) => {
  return await db(TABLE_NAME)
    .select()
    .where('request_id', id);
}

const updateOrder = async (id, data) => {
  return await db(TABLE_NAME)
    .select()
    .where('request_id', id)
    .update(data);
}

const deleteOrder = async (id) => {
  return await db(TABLE_NAME)
    .select()
    .where('request_id', id)
    .del();
}

module.exports = {
  getAllOrders,
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder
}
