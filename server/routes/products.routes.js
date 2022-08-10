const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', newProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
