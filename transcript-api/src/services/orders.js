const { v4: uuidv4 } = require('uuid');

const { emailer } = require('../utils/email');
const { ROLES } = require('../constants/role');
const orderModel = require('../models/orders');
const getDateTime = require('../utils/datetime');
const { orderMappings } = require('../mappings/orders');
const { orderSerialize } = require('../serializer/orders');
const { stateValidation } = require('../utils/stateValidation');

const { TRANSCRIPT_TYPE } = require('../constants/transcript-type');
const { REQUEST_TYPE } = require('../constants/requestType');

// utility to filter the orders based on role
const filterOrder = (orders, role, cdsCode) => {
  let ordersForRole;
  if (role === ROLES.DISTRICT) {
    ordersForRole = orders.filter(
      (item) => item.CDS_code === cdsCode && item.requested_type.toLowerCase() === 'district'
    );
  } else if (role === ROLES.STAFF) {
    ordersForRole = orders;
  } else {
    ordersForRole = [];
  }

  return ordersForRole;
};

const getAllOrders = async (role, cdsCode) => {
  let orders = await orderModel.getAllOrders();
  orders = filterOrder(orders, role, cdsCode);

  return orderSerialize(orders);
};

const addOrder = async (order) => {
  order.requestId = uuidv4();
  order.requestDate = getDateTime(new Date());

  const { releaseToEmail } = order;
  await emailer('Request Confirmed', releaseToEmail, 'REQUEST_CONFIRMATION');

  return await orderModel.addOrder(orderMappings(order));
};

const getOrder = async (role, cdsCode, requestId) => {
  let order = await orderModel.getOrder(requestId);
  order = filterOrder(order, role, cdsCode);

  return orderSerialize(order);
};

const getOrderWithoutRole = async (requestId) => {
  let order = await orderModel.getOrder(requestId);

  return orderSerialize(order);
};

const updateOrder = async (id, order) => {
  return await orderModel.updateOrder(id, orderMappings(order));
};

const approveOrder = async (role, id, order) => {
  const originalOrder = await getOrder(role, null, id);

  const { releaseToEmail, requestedType, status, typeOfTranscript } = originalOrder[0];
  if (stateValidation(status, order.status, typeOfTranscript)) {

    const emailTemplate =
      requestedType === REQUEST_TYPE.STUDENT ? 'REQUEST_INITIAL_APPROVED_STUDENT' : 'REQUEST_APPROVED_DISTRICT';
    await emailer('Transcript Approved', releaseToEmail, emailTemplate);

    return await updateOrder(id, order);
  }

  return;
};

const denyOrder = async (role, id, order) => {
  const originalOrder = await getOrder(role, null, id);

  const { releaseToEmail, status, typeOfTranscript } = originalOrder[0];

  if (stateValidation(status, order.status, typeOfTranscript)) {
    const emailTemplate = 'REQUEST_DENIED';
    await emailer('Transcript Denied', releaseToEmail, emailTemplate);

    return await updateOrder(id, order);
  }

  return;
};

const deleteOrder = async (requestId) => {
  return await orderModel.deleteOrder(requestId);
};

module.exports = {
  getAllOrders,
  addOrder,
  getOrder,
  getOrderWithoutRole,
  updateOrder,
  approveOrder,
  denyOrder,
  deleteOrder,
};
