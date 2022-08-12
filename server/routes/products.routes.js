const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', isAuthenticatedUser, newProduct);
router.put('/:id', isAuthenticatedUser, updateProduct);
router.delete('/:id', isAuthenticatedUser, deleteProduct);

module.exports = router;
