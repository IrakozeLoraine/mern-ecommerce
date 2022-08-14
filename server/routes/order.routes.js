const express = require('express');

const router = express.Router();

const { newOrder } = require('../controllers/order.controller');

router.post('/', newOrder);

module.exports = router;
