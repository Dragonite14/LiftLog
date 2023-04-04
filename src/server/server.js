const path = require('path');
const express = require('express');
const apiRouter = require('./routes/api.js');
const { query, connectDB } = require('./models/liftModel');
const liftLogController = require('./controllers/liftLogController.js');

const app = express();
//! Change the PORT variable to a different value since Vite uses port 3000 by default:
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Vite serves the static files by default, so you don't need to use Express for that.
// app.use(express.static(path.resolve(__dirname, "../src")));

// app.use('/', console.log('request to '))

app.use('/api', apiRouter);

// app.get('/exercises', liftLogController.getExercises, (req, res) => {
//   res.status(200).json(res.locals.exercises);
// });

app.use((req, res) => res.status(404).send('WRONG PAGE, DUDE!'));

// Default error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  //console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const { createServer } = require('vite');
(async () => {
  const vite = await createServer({
    // server: { middlewareMode: true },
    // appType: 'custom',
    app,
  });
  console.log(`Listening on port ${PORT}`);
  // app.use(vite.middlewares);

  await vite.listen(PORT);
})();

module.exports = app;
