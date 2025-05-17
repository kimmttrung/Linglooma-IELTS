const { findQuestionBasedOnLesson } = require('../models/questionModel');

// Lấy danh sách câu hỏi theo lessonId
const getQuestionsByLessonController = async (req, res) => {
    const { lessonId } = req.body;

    if (!lessonId) {
        return res.status(400).json({ message: "Thiếu lessonId" });
    }

    try {
        const result = await findQuestionBasedOnLesson(lessonId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Lỗi khi lấy câu hỏi theo lessonId:", err);
        res.status(500).json({ message: 'Lỗi khi lấy câu hỏi' });
    }
};

module.exports = {
    getQuestionsByLessonController
};
