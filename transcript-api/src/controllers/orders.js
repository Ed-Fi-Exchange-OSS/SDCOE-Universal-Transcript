const logger = require('../utils/logger').default;
const orderService = require('../services/orders');

const getAllOrders = async (req, res, next) => {
  try {
    const { role, cdsCode } = req;
    const order = await orderService.getAllOrders(role, cdsCode);

    res.status(200).json({
      messages: order,
    });
  } catch (e) {
    logger.error('Get all orders error', e);
    res.status(500).json({ error: 'Error getting all orders. ' + e });
  }
};

const addOrder = async (req, res, next) => {
  try {
    await orderService.addOrder(req.body);

    res.status(200).json({
      messages: 'Order added successfully',
    });
  } catch (e) {
    logger.error('Add order error', e);
    res.status(405).json({ error: 'Error adding new order. ' + e });
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { role, cdsCode } = req;
    const order = await orderService.getOrder(role, cdsCode, req.params.requestId);

    res.status(200).json({
      messages: order,
    });
  } catch (e) {
    logger.error('Get order error', e);
    res.status(404).json({ error: 'Requested Order not be found' });
  }
};

const updateOrder = async (req, res, next) => {
  const { role } = req;
  const requestId = req.params.requestId;
  const status = req.body.status;

  try {
    if (status === 'approved') {
      await orderService.approveOrder(role, requestId, req.body);
    } else if (status === 'denied') {
      await orderService.denyOrder(role, requestId, req.body);
    } else {
      await orderService.updateOrder(requestId, req.body);
    }

    res.status(200).json({
      messages: 'Order has been successfully updated',
    });
  } catch (e) {
    logger.error('Update order error', e);
    res.status(304).json({ error: 'Update operation for orders failed' });
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.requestId);

    res.status(200).json({
      messages: 'Order deleted successfully',
    });
  } catch (e) {
    logger.error('Delete order error', e);
    res.status(304).json({ error: 'Delete operation failed for Orders' });
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
