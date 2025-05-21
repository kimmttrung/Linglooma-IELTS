const { insertOrUpdateIncorrectPhonemes , getIncorrectPhonemesOfLesson } = require('../models/incorrectphonemesModel');

const insertIncorrectPhonemeController = async (req, res) => {
  const { phoneme: errorMap, questionResultId, lessonResultId, questionId, studentId } = req.body;
  if (!errorMap || !questionResultId || !lessonResultId || !questionId || !studentId) {
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

// Lấy phonemes sai
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

module.exports = {
  insertIncorrectPhonemeController,
  getIncorrectPhonemesOfLessonController,
};
