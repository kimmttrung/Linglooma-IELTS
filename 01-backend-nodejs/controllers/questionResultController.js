const { insertQuestionResult, getQuestionResultOfLesson } = require('../models/questionResultModel');

// Thêm kết quả một câu hỏi sau khi làm bài
const insertQuestionResultController = async (req, res) => {
    const { lessonResultId, questionId, score, errorPronouce, studentId } = req.body;

    if (!lessonResultId || !questionId || score == null || !studentId) {
        return res.status(400).json({ message: "Thiếu tham số để thêm kết quả câu hỏi" });
    }

    try {
        await insertQuestionResult(lessonResultId, questionId, score, errorPronouce, studentId);
        res.status(200).json({ message: "Thêm kết quả câu hỏi thành công" });
    } catch (err) {
        console.error("Lỗi khi thêm kết quả câu hỏi:", err);
        res.status(500).json({ message: "Lỗi khi thêm kết quả câu hỏi" });
    }
};

// Lấy kết quả tất cả câu hỏi của một lần làm bài học
const getQuestionResultOfLessonController = async (req, res) => {
    const { studentId, lessonResultId } = req.body;

    if (!studentId || !lessonResultId) {
        return res.status(400).json({ message: "Thiếu tham số để truy xuất kết quả" });
    }

    try {
        const result = await getQuestionResultOfLesson(studentId, lessonResultId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Lỗi khi truy xuất kết quả câu hỏi:", err);
        res.status(500).json({ message: "Lỗi khi truy xuất kết quả câu hỏi" });
    }
};

module.exports = {
    insertQuestionResultController,
    getQuestionResultOfLessonController
};
