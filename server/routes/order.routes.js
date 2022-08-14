const express = require('express');

const router = express.Router();

const {
  newOrder,
  getOrderDetails,
} = require('../controllers/order.controller');

router.post('/', newOrder);
router.get('/:id', getOrderDetails);

module.exports = router;
