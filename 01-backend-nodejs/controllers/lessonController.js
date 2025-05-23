const client = require('../db');
const { findLesson } = require('../models/lessonModel');

const getLessonController = async (req, res) => {
    try {
        const lessons = await findLesson();
        res.status(200).json(lessons.rows);
    } catch (err) {
        res.status(500).json({ message: 'Retriving lesson failed' });
    }
}

const getAllLessonsController = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM lesson');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        return res.status(500).json({ message: 'Lỗi khi truy vấn dữ liệu bài học' });
    }
};
module.exports = {
    getLessonController, getAllLessonsController
};