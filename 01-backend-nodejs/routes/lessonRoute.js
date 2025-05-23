const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/all', lessonController.getAllLessonsController);

module.exports = router;
