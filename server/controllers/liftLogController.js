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
liftLogController.deleteExercise = (req, res, next) => {
  console.log('inside delete exercise middelware');
  const { exercise_name } = req.body;
  console.log('req.body', req.body);
  console.log('name', exercise_name);
  const queryStr = 'DELETE FROM exercises WHERE name IN ($1);';
  db.query(queryStr, [exercise_name], (err, results) => {
    if (err) {
      console.error('Error executing SQL query delete:', err);
      return next(err); // pass the error to the error handling middleware
    }
    // do something with the results, if necessary
    res.json({ exercise_name });
  });
};

// controller middleware for adding an exercise
liftLogController.addSet = (req, res, next) => {
  const { exerciseId, setWeight, setReps } = req.body;
  const queryStr = `
  INSERT INTO set ("exerciseID", weight, reps) 
  VALUES ($1, $2, $3) 
  RETURNING id;
  `;
  db.query(queryStr, [exerciseId, setWeight, setReps], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return next(err); // pass the error to the error handling middleware
    }
    // do something with the results, if necessary
    console.log('results', results);
    const setId = results.rows[0].id;
    res.json({ setId });
  });
};

//! Add more middleware here

//TODO: PSQL COMMAND IN TERMINAL
/* 
psql postgres://fqcrysgb:uRqZeJAveI2mtXhQDRlrYUHIDPRfhpTy@lallah.db.elephantsql.com/fqcrysgb
psql \d exercises
SELECT * FROM exercises;

\q to quit
*/

module.exports = liftLogController;
