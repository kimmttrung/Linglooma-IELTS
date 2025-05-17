const { insertQuestionResult, getQuestionResultOfLesson } = require('../models/questionResultModel');

// Thêm kết quả một câu hỏi sau khi làm bài
const insertQuestionResultController = async (req, res) => {
    const { lessonResultId, questionId, score, errorPronouce, studentId } = req.body;

    if (!lessonResultId || !questionId || score == null || !studentId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await insertQuestionResult(lessonResultId, questionId, score, errorPronouce, studentId);
        res.status(200).json({ message: "Insert question results successfully" });
    } catch (err) {
        console.error("Insert question results failed: ", err);
        res.status(500).json({ message: "Insert question results failed" });
    }
};

// Lấy kết quả tất cả câu hỏi của một lần làm bài học
const getQuestionResultOfLessonController = async (req, res) => {
    const { studentId, lessonResultId } = req.params;

    if (!studentId || !lessonResultId) {
        return res.status(400).json({ message: "Mising parameters studentId or lessonResultId" });
    }

    try {
        const result = await getQuestionResultOfLesson(studentId, lessonResultId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Get question results failed: ", err);
        res.status(500).json({ message: "Get question results failed" });
    }
};

module.exports = {
    insertQuestionResultController,
    getQuestionResultOfLessonController
};
