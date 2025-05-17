const express = require('express');
const router = express.Router();
const questionResultController = require('../controllers/questionResultController');

// POST: Thêm kết quả một câu hỏi sau khi làm bài
router.post('/', questionResultController.insertQuestionResultController);

// GET: Lấy kết quả tất cả câu hỏi của một lần làm bài học
router.get('/:studentId/:lessonResultIdId', questionResultController.getQuestionResultOfLessonController);

module.exports = router;
