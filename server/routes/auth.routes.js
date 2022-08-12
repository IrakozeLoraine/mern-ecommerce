const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  changePassword,
} = require('../controllers/auth.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/signout', logoutUser);
router.get('/profile', isAuthenticatedUser, currentUser);
router.put('/password/update', isAuthenticatedUser, changePassword);

module.exports = router;
