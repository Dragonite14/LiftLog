console.log('api.js is being executed');
const express = require('express');
const liftLogController = require('../controllers/liftLogController');

const router = express.Router();

// router for getting exercises
router.get('/exercises', liftLogController.getExercises, (req, res) => {
  res.status(200).json(res.locals.exercises);
});

// router for adding an exercise
router.post('/exercises', liftLogController.addExercise, (req, res) => {
  console.log('locals.exercise: ', res.locals.exercise_name);
  console.log('after addExercise controller');
  res.status(200).json([res.locals.exercise_name]);
});

//! Add more routes here ()

module.exports = router;
