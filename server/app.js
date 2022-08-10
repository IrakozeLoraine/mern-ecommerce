const express = require('express');
const app = express();

const ErrorMiddleware = require('./middlewares/errors');
const productRoutes = require('./routes/products.routes');

app.use(express.json());

app.use('/api/v1/products', productRoutes);

app.use(ErrorMiddleware);

module.exports = app;
