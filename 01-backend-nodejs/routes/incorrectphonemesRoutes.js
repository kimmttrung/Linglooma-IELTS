const express = require("express");
const router = express.Router();
const {
  insertIncorrectPhonemeController,
  getIncorrectPhonemesOfLessonController,
  getFeedbackSummaryController,
  getLessonsSummaryController,
} = require("../controllers/incorrectphonemesController");

router.post("/add", insertIncorrectPhonemeController);
router.get("/:studentId/:lessonResultId", getIncorrectPhonemesOfLessonController);
router.get('/feedback-summary', getFeedbackSummaryController);
router.get('/resultView', getLessonsSummaryController);

module.exports = router;
