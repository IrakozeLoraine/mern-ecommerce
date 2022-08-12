const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', isAuthenticatedUser, authorizeRoles('ADMIN'), newProduct);
router.put('/:id', isAuthenticatedUser, authorizeRoles('ADMIN'), updateProduct);
router.delete(
  '/:id',
  isAuthenticatedUser,
  authorizeRoles('ADMIN'),
  deleteProduct
);

module.exports = router;
