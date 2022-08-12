const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

process.on('uncaughtException', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down server due to unhandled promise rejection');
  process.exit(1);
});

dotenv.config({ path: 'config/config.env' });

connectDB();

const server = app.listen(process.env.PORT, () =>
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
);

process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down server due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});
