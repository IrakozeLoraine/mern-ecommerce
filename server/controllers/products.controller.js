const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
    message: 'Product successfully added',
  });
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    data: product,
    message: 'Product successfully updated',
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    success: true,
    data: products,
    count: products.length,
  });
};

exports.getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product is successfully deleted',
  });
};
