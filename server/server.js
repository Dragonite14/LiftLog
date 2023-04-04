const path = require('path');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api.js');
const { connectDB } = require('./models/liftModel');
const liftLogController = require('./controllers/liftLogController.js');

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api', apiRouter);
app.use(express.static(path.resolve(__dirname, '../'), { fallback: false }));

app.use((req, res) => res.status(404).send('WRONG PAGE, DUDE!'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
