const db = require("../models/liftModel");

const liftLogController = {};

liftLogController.getExercises = (req, res, next) => {
  const queryStr = 'SELECT * FROM "public"."exercises";';

  db.query(queryStr)
    .then((data) => {
      res.locals.exercises = data.rows;
      return next();
    })
    .catch((err) => {
      const newErr = {
        log: "Error fetching from db, getExercises",
        status: 500,
        message: "Error fetching from db, getExercises",
      };
      return next(newErr);
    });
};

//! Add more middleware here

//TODO: TRY PSQL COMMAND IN TERMINAL

module.exports = liftLogController;
