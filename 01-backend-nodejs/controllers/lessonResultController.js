const { insertLessonResult, getLessonResult, getRecentlyLessonResult } = require('../models/lessonResultModel');

const insertLessonResultController = async (req, res) => {
  const { studentId, lessonId, finishedTime, averageScore, feedback } = req.body;

  if (!studentId || !lessonId || !finishedTime || averageScore == null) {
    return res.status(400).json({ message: "Missing parameters" });
  }
  try {
    const inserted = await insertLessonResult({ studentId, lessonId, finishedTime, averageScore, feedback });
    res.status(201).json(inserted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error inserting lesson result" });
  }
};

const getLessonResultController = async (req, res) => {
  const { studentId, lessonId } = req.query; // hoặc params tuỳ bạn

  if (!studentId || !lessonId) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  try {
    const results = await getLessonResult(studentId, lessonId);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching lesson result" });
  }
};

const getRecentlyLessonResultController = async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ message: "Missing studentId" });
  }

  try {
    const results = await getRecentlyLessonResult(studentId);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching recent lesson results" });
  }
};

module.exports = {
  insertLessonResultController,
  getLessonResultController,
  getRecentlyLessonResultController
};
