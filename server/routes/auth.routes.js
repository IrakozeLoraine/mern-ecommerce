const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  changePassword,
  updateProfile,
} = require('../controllers/auth.controller');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/signout', logoutUser);
router.get('/profile', isAuthenticatedUser, currentUser);
router.put('/profile/update', isAuthenticatedUser, updateProfile);
router.put('/password/update', isAuthenticatedUser, changePassword);

module.exports = router;
