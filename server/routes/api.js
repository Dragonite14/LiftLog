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
  // console.log('locals.exercise: ', res.locals.exercise_name);
  // console.log('after addExercise controller');
  res.status(200).json([res.locals.exercise_name]);
});

// router for deleting an exercise
router.delete('/exercises', liftLogController.deleteExercise, (req, res) => {
  console.log('locals.deleted: ', res.locals.deleted);
  console.log('after deleteExercise controller');
  res.status(200).json(res.locals.deleted);
});

// router for adding a set
// router.post('/set', liftLogController.addSet, (req, res) => {
//   // console.log('locals.set: ', res.locals.setData);
//   // console.log('after addSet controller');
//   res.status(200).json([res.locals.setData]);
// });
//! Add more routes here ()

module.exports = router;
