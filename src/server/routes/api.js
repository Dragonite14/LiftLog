const express = require('express');
const liftLogController = require('../controllers/liftLogController');

const router = express.Router();

router.get('/', liftLogController.getExercises, (req, res) => {
  console.log(res.locals.exercises);
  res.set('Content-Type', 'application/json');
  res.status(200).json(res.locals.exercises);
});

//! Add more routes here ()

module.exports = router;
