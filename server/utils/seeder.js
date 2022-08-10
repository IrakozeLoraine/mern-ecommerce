const Product = require('../models/Product');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

const products = require('../data/products.json');
dotenv.config({ path: '../config/config.env' });

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(products);
    console.log('All products are added');

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
