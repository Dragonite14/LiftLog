console.log('controller executed');
const db = require('../models/liftModel');

// liftLogController object
const liftLogController = {};

// controller middleware for getting all exercises
liftLogController.getExercises = (req, res, next) => {
  console.log('LANCE IS COOL');
  const queryStr = 'SELECT * FROM exercises;';
  db.query(queryStr)
    .then((data) => {
      res.locals.exercises = data.rows;
      console.log(data.rows);
      res.setHeader('Content-Type', 'application/json');
      return next();
    })
    .catch((err) => {
      const newErr = {
        log: 'Error fetching from db, getExercises',
        status: 500,
        message: 'Error fetching from db, getExercises',
      };
      return next(newErr);
    });
};

// controller middleware for adding an exercise
liftLogController.addExercise = (req, res, next) => {
  console.log('inside addExercise middleware');
  const { exercise_name } = req.body;
  console.log('req.body', req.body);
  console.log('name', exercise_name);
  const queryStr = `INSERT INTO exercises (name) VALUES ($1);`;
  db.query(queryStr, [exercise_name], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return next(err); // pass the error to the error handling middleware
    }
    // do something with the results, if necessary
    res.json({ exercise_name });
  });
};

// controller middleware for deleting an exercise
liftLogController.deleteExercise = (req, res, next) => {};
//! Add more middleware here

//TODO: PSQL COMMAND IN TERMINAL
/* 
psql postgres://fqcrysgb:uRqZeJAveI2mtXhQDRlrYUHIDPRfhpTy@lallah.db.elephantsql.com/fqcrysgb
psql \d exercises
SELECT * FROM exercises;

\q to quit
*/

module.exports = liftLogController;
