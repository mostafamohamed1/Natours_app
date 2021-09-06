const mongoose = require('mongoose');
const dotEnv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥💥 Shutting down.... ');
  console.log(err.name, err.message);

  process.exit(1);
});

dotEnv.config({ path: './config.env' });
const app = require('./app');

// connect to DB
const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection Successful!'));

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥💥 Shutting down.... ');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
