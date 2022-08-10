const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: 'config/config.env' });

connectDB();

app.listen(process.env.PORT, () =>
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
);
