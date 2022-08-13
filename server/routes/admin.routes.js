const express = require('express');
const {
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('../controllers/admin.controller');
const router = express.Router();

router.get('/users', allUsers);
router
  .route('/users/:id')
  .get(getUserDetails)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
