const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, address, password } = req.body;

  const newPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    address,
    password: newPassword,
    avatar: { public_id: 'sample public id', url: 'a url here' },
  });

  sendToken(user, 201, `${user.name} successfully registered`, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  let newUser = { ...user._doc };
  delete newUser.password;

  sendToken(newUser, 200, `Welcome Back, ${user.name}`, res);
});

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  user.password = await bcrypt.hash(req.body.password, 10);

  await user.save();

  let newUser = { ...user._doc };
  delete newUser.password;
  sendToken(newUser, 200, 'Password updated successfully', res);
});
