const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/:type', lessonController.handleLessonController);
router.get('/:id', lessonController.hanleLessonImageController);

module.exports = router;
