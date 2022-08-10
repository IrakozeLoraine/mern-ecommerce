const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) =>
      console.log(`MongoDB connected to HOST: ${con.connection.host}`)
    )
    .catch((err) => console.error(err));
};

module.exports = connectDB;
