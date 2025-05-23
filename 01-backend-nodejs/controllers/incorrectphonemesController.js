const {
  insertOrUpdateIncorrectPhonemes,
  getIncorrectPhonemesOfLesson,
  getTopIncorrectPhonemesWithAvgScore,
  getResultViews,
} = require("../models/incorrectphonemesModel");

const insertIncorrectPhonemeController = async (req, res) => {
  const { phoneme: errorMap, questionResultId, lessonResultId, questionId, studentId } = req.body;

  if (!errorMap || !questionResultId || !lessonResultId || !questionId || !studentId) {
    console.warn("Missing required fields in insert request");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await insertOrUpdateIncorrectPhonemes(errorMap, questionResultId, lessonResultId, questionId, studentId);
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
  const { lessonResultId } = req.query;
  try {
    const rows = await getTopIncorrectPhonemesWithAvgScore(lessonResultId);
    // console.log("check rows", rows);

    const feedbackSummary = {};
    rows.forEach(
      ({
        questionid,
        phoneme,
        total_incorrect,
        ieltsband,
        accuracy,
        fluency,
        completeness,
        pronunciation,
        avg_feedback,
      }) => {
        if (!feedbackSummary[questionid]) {
          feedbackSummary[questionid] = {
            questionId: questionid,
            averageScores: {
              ieltsBand: ieltsband || null,
              accuracy: accuracy || null,
              fluency: fluency || null,
              completeness: completeness || null,
              pronunciation: pronunciation || null,
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

const getLessonsSummaryController = async (req, res) => {
  try {
    const data = await getResultViews();

    // Format latestFinishedTime thành ISO string nếu có
    const formattedData = data.map(item => ({
      lessonId: item.lessonId,
      lessonName: item.lessonName,
      latestFinishedTime: item.latestFinishedTime ? item.latestFinishedTime.toISOString() : null,
      averageScore: item.averageScore,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching lessons summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  insertIncorrectPhonemeController,
  getIncorrectPhonemesOfLessonController,
  getFeedbackSummaryController,
  getLessonsSummaryController,
};
