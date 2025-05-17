const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/type', lessonController.getLessonController);

module.exports = router;
