const {findLesson} = require('../models/lessonModel');

const getLessonController = async (req, res) => {
    try {
        const lessons = await findLesson();
        res.status(200).json(lessons.rows);
    } catch (err) {
        res.status(500).json({message: 'Retriving lesson failed'});
    }
}

module.exports = {
    getLessonController
};