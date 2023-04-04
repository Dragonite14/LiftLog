console.log('controller executed');
const db = require('../models/liftModel');

const liftLogController = {};

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

//! Add more middleware here

//TODO: PSQL COMMAND IN TERMINAL
/* 
psql postgres://fqcrysgb:uRqZeJAveI2mtXhQDRlrYUHIDPRfhpTy@lallah.db.elephantsql.com/fqcrysgb
psql \d exercises
SELECT * FROM exercises;

\q to quit
*/

module.exports = liftLogController;
