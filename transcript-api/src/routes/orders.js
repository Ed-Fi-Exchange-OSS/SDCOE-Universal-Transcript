const router = require("express").Router();

const authenticate = require('../middlewares/authenticate');
const authorizeStaff = require("../middlewares/authorizeStaff");
const validateRole = require("../middlewares/validateRole");

const ordersController = require('../controllers/orders');

router.get('/', authenticate, validateRole, ordersController.getAllOrders);
router.post('/', ordersController.addOrder);
router.get('/:requestId', authenticate, validateRole, ordersController.getOrder);
router.put('/:requestId', authenticate, validateRole, authorizeStaff, ordersController.updateOrder);
router.delete('/:requestId', authenticate, validateRole, authorizeStaff, ordersController.deleteOrder);



module.exports = router;
