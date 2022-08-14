const express = require('express');
const router = express.Router();

const { authorizeRoles } = require('../middlewares/auth');

const {
  newOrder,
  orderDetails,
  allOrders,
  loggedInUserOrders,
  updateOrderStatus,
  ordersByStatus,
  deleteOrder,
} = require('../controllers/order.controller');

router
  .route('/')
  .post(newOrder)
  .get(authorizeRoles('ADMIN'), allOrders)
  .delete(authorizeRoles('ADMIN'), deleteOrder);

router.get('/me', loggedInUserOrders);
router.get('/:status', authorizeRoles('ADMIN'), ordersByStatus);
router.get('/:id', orderDetails);
router.put('/:id/status', authorizeRoles('ADMIN'), updateOrderStatus);

module.exports = router;
