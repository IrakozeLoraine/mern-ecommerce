const express = require('express');
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require('../controllers/product.controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router
  .route('/reviews')
  .get(getReviews)
  .put(isAuthenticatedUser, createReview)
  .delete(isAuthenticatedUser, deleteReview);

router
  .route('/')
  .get(getProducts)
  .post(isAuthenticatedUser, authorizeRoles('ADMIN'), newProduct);
router
  .route('/:id')
  .get(getProductById)
  .put(isAuthenticatedUser, authorizeRoles('ADMIN'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('ADMIN'), deleteProduct);

module.exports = router;
