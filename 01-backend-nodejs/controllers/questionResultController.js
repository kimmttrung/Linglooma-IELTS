const { insertQuestionResult, getQuestionResultOfLesson, getLastestQuestionResult} = require('../models/questionResultModel');

// Thêm kết quả một câu hỏi sau khi làm bài
const insertQuestionResultController = async (req, res) => {
    const {
        lessonResultId,
        questionId,
        ieltsBand,
        studentId,
        accuracy,
        fluency,
        completeness,
        pronunciation,
        feedback
    } = req.body;

    // Kiểm tra các trường bắt buộc
    if (
        !lessonResultId || !questionId || ieltsBand == null || !studentId ||
        accuracy == null || fluency == null || completeness == null ||
        pronunciation == null || feedback == null
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await insertQuestionResult(
            lessonResultId,
            questionId,
            ieltsBand,
            studentId,
            accuracy,
            fluency,
            completeness,
            pronunciation,
            feedback
        );

        res.status(200).json({ message: "Insert question result successfully" });
    } catch (err) {
        console.error("Insert question result failed: ", err);
        res.status(500).json({ message: "Insert question result failed" });
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

// Lấy kết quả câu hỏi gần nhất của một học sinh
const getLastestQuestionResultController = async (req, res) => {
    const { studentId, questionId, lessonId} = req.params;

    if (!studentId) {
        return res.status(400).json({ message: "Mising parameters studentId" });
    }

    try {
        const result = await getLastestQuestionResult(studentId, questionId, lessonId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Get question results failed: ", err);
        res.status(500).json({ message: "Get question results failed" });
    }
};

module.exports = {
    insertQuestionResultController,
    getQuestionResultOfLessonController,
    getLastestQuestionResultController
};
