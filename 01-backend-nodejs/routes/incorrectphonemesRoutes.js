const express = require("express");
const router = express.Router();
const {
  insertIncorrectPhonemeController,
  getIncorrectPhonemesOfLessonController,
  getFeedbackSummaryController,
} = require("../controllers/incorrectphonemesController");

router.post("/add", insertIncorrectPhonemeController);
router.get("/:studentId/:lessonResultId", getIncorrectPhonemesOfLessonController);
router.get('/feedback-summary', getFeedbackSummaryController);

module.exports = router;
