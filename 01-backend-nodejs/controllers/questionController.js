const { findQuestionBasedOnLesson } = require("../models/questionModel");


const getQuestionsByLesson = async (req, res) => {
    const { lessonId } = req.params;

    if (!lessonId) {
        return res.status(400).json({ message: "Missing lessonId" });
    }

    try {
        const result = await findQuestionBasedOnLesson(lessonId);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No questions found for this lesson" });
        }

        res.json({ questions: result.rows });
    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getQuestionsByLesson,
};

