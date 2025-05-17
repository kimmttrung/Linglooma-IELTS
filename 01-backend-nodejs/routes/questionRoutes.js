const express = require("express");
const { getQuestionsByLesson } = require("../controllers/questionController");
const router = express.Router();

// Route lấy câu hỏi theo lessonId
router.get("/questions/:lessonId", getQuestionsByLesson);

module.exports = router;
