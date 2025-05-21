const {
  insertOrUpdateIncorrectPhonemes,
  getIncorrectPhonemesOfLesson,
  getTopIncorrectPhonemesWithAvgScore,
} = require("../models/incorrectphonemesModel");

const insertIncorrectPhonemeController = async (req, res) => {
  const { phoneme: errorMap, questionResultId, lessonResultId, questionId, studentId } = req.body;
  console.log("Received insert request body:", req.body);

  if (!errorMap || !questionResultId || !lessonResultId || !questionId || !studentId) {
    console.warn("Missing required fields in insert request");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await insertOrUpdateIncorrectPhonemes(errorMap, questionResultId, lessonResultId, questionId, studentId);
    console.log("Insert/Update phonemes success");
    res.status(200).json({ message: "Insert/Update incorrect phonemes successfully" });
  } catch (err) {
    console.error("Insert/Update incorrect phonemes failed:", err);
    res.status(500).json({ message: "Insert/Update incorrect phonemes failed" });
  }
};

const getIncorrectPhonemesOfLessonController = async (req, res) => {
  const { studentId, lessonResultId } = req.params;

  if (!studentId || !lessonResultId) {
    return res.status(400).json({ message: "Missing parameters studentId or lessonResultId" });
  }

  try {
    const result = await getIncorrectPhonemesOfLesson(studentId, lessonResultId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Get incorrect phonemes failed: ", err);
    res.status(500).json({ message: "Get incorrect phonemes failed" });
  }
};

const getFeedbackSummaryController = async (req, res) => {
  try {
    const rows = await getTopIncorrectPhonemesWithAvgScore();
    // console.log("check rows", rows);

    const feedbackSummary = {};
    rows.forEach(
      ({
        questionid,
        phoneme,
        total_incorrect,
        avg_ieltsband,
        avg_accuracy,
        avg_fluency,
        avg_completeness,
        avg_pronunciation,
        avg_feedback,
      }) => {
        if (!feedbackSummary[questionid]) {
          feedbackSummary[questionid] = {
            questionId: questionid,
            averageScores: {
              ieltsBand: avg_ieltsband || null,
              accuracy: avg_accuracy || null,
              fluency: avg_fluency || null,
              completeness: avg_completeness || null,
              pronunciation: avg_pronunciation || null,
            },
            feedback: avg_feedback || "",
            topIncorrectPhonemes: [],
          };
        }
        feedbackSummary[questionid].topIncorrectPhonemes.push({
          phoneme,
          count: total_incorrect,
        });
      }
    );

    res.json(Object.values(feedbackSummary));
  } catch (err) {
    console.error("Failed to get feedback summary:", err);
    res.status(500).json({ message: "Failed to get feedback summary" });
  }
};

module.exports = {
  insertIncorrectPhonemeController,
  getIncorrectPhonemesOfLessonController,
  getFeedbackSummaryController,
};
