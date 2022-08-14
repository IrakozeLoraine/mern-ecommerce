const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
    message: 'Product successfully added',
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
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
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = req.query.rowsPerPage;
  const totalCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(
    Product.find().populate('user'),
    req.query
  )
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    data: products,
    count: products.length,
    totalCount,
  });
});

exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('user');
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product is successfully deleted',
  });
});

exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, value) => value.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: false,
    data: product,
    message: 'Review has been recorded',
  });
});

exports.getReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  res.status(200).json({
    success: true,
    data: product.reviews,
  });
});

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numReviews = reviews.length;

  const ratings =
    product.reviews.length !== 0
      ? product.reviews.reduce((acc, value) => value.rating - acc, 0) /
        reviews.length
      : 0;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: 'Review successfully removed',
  });
});
