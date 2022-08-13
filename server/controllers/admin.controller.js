const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');

exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const { name, email, phone, address, role } = req.body;

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
      address,
      role,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    data: user,
    message: 'User successfully updated',
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User is successfully deleted',
  });
});
