const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const ErrorMiddleware = require('./middlewares/errors');
const productRoutes = require('./routes/products.routes');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const { isAuthenticatedUser, authorizeRoles } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use(
  '/api/v1/admin',
  isAuthenticatedUser,
  authorizeRoles('ADMIN'),
  adminRoutes
);

app.use(ErrorMiddleware);

module.exports = app;
