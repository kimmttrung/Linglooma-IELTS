const {
    insertLessonResult,
    getLessonResult,
    getRecentlyLessonResult
} = require('../models/lessonResultModel');

// Thêm kết quả học bài
const insertLessonResultController = async (req, res) => {
    const { studentId, lessonId, finishedTime, averageScore, feedback } = req.body;
    
    if (!studentId || !lessonId || !finishedTime || !averageScore) {
        return res.status(400).json({ message: "Thiếu tham số để truy xuất dữ liệu" });
    }

    try {
        await insertLessonResult(studentId, lessonId, finishedTime, averageScore, feedback);
        res.status(200).json({ message: "Thêm dữ liệu thành công" });
    } catch (err) {
        console.error("Lỗi khi thêm dữ liệu:", err);
        res.status(500).json({ message: 'Lỗi thêm dữ liệu' });
    }
};

// Lấy kết quả của 1 học sinh cho 1 bài học
const getLessonResultController = async (req, res) => {
    const { studentId, lessonId } = req.body;

    if (!studentId || !lessonId) {
        return res.status(400).json({ message: "Thiếu studentId hoặc lessonId" });
    }

    try {
        const result = await getLessonResult(studentId, lessonId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Lỗi khi truy xuất dữ liệu:", err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
};

// Lấy 7 kết quả gần nhất của học sinh
const getRecentlyLessonResultController = async (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
        return res.status(400).json({ message: "Thiếu studentId" });
    }

    try {
        const result = await getRecentlyLessonResult(studentId);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu gần đây:", err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu gần đây' });
    }
};

module.exports = {
    insertLessonResultController,
    getLessonResultController,
    getRecentlyLessonResultController
};
