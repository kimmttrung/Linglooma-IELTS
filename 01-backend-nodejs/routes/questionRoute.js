const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// GET: Lấy danh sách câu hỏi theo lessonId
router.get('/:lessonId', questionController.getQuestionsByLessonController);

module.exports = router;
