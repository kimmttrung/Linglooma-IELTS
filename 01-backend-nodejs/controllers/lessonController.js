const { findLessonById, findLessonByType } = require('../models/lessonModel');

const handleLessonController = async (req, res) => {
    try {
        const lessons = await findLessonByType();
        res.status(200).json(lessons.rows);
    } catch (err) {
        res.status(500).json({ message: 'Retriving lesson failed' });
    }
}

const hanleLessonImageController = async (req, res) => {
    try {
        const lessons = await findLessonById();
        res.status(200).json(lessons.rows);
    } catch (err) {
        res.status(500).json({ message: 'Retriving lesson failed' });
    }
}

module.exports = {
    handleLessonController, hanleLessonImageController
};