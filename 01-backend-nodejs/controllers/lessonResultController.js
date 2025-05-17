const {
    insertLessonResult,
    getLessonResult,
    getRecentlyLessonResult
} = require('../models/lessonResultModel');

// Thêm kết quả học bài
const insertLessonResultController = async (req, res) => {
    const { studentId, lessonId, finishedTime, averageScore, feedback } = req.body;
    
    if (!studentId || !lessonId || !finishedTime || !averageScore) {
        return res.status(400).json({ message: "Missing parameters to insert data" });
    }

    try {
        await insertLessonResult(studentId, lessonId, finishedTime, averageScore, feedback);
        res.status(200).json({ message: "Data added successfully" });
    } catch (err) {
        console.error("Error adding data:", err);
        res.status(500).json({ message: 'Error adding data' });
    }
};

// Lấy kết quả của 1 học sinh cho 1 bài học
const getLessonResultController = async (req, res) => {
    const { studentId, lessonId } = req.params;

    if (!studentId || !lessonId) {
        return res.status(400).json({ message: "Missing parameters to retrieve data" });
    }

    try {
        const result = await getLessonResult(studentId, lessonId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error retrieving data:", err);
        res.status(500).json({ message: 'Error retrieving data' });
    }
};

// Lấy 7 kết quả gần nhất của học sinh
const getRecentlyLessonResultController = async (req, res) => {
    const { studentId } = req.params;

    if (!studentId) {
        return res.status(400).json({ message: "Missing parameters to retrieve data" });
    }

    try {
        const result = await getRecentlyLessonResult(studentId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error retriving data", err);
        res.status(500).json({ message: 'Error retriving data' });
    }
};

module.exports = {
    insertLessonResultController,
    getLessonResultController,
    getRecentlyLessonResultController
};
