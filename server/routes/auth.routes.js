const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/auth.controller');

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/signout', logoutUser);

module.exports = router;
