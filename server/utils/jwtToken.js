const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, message, res) => {
  //create jwt token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //it won't be accessed with JS code
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    data: user,
    token,
    message,
  });
};

module.exports = sendToken;
