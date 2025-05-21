const express = require('express');
const router = express.Router();
const { insertIncorrectPhonemeController, getIncorrectPhonemesOfLessonController } = require('../controllers/incorrectphonemesController');

// Route để thêm phoneme sai
router.post('/add', insertIncorrectPhonemeController);

// Route để lấy phonemes sai của một học viên cho một bài học
router.get('/:studentId/:lessonResultId', getIncorrectPhonemesOfLessonController);

module.exports = router;
