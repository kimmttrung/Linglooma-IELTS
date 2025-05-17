const client = require('../db');

const findQuestionBasedOnLesson = async (lessonId) => {

    const result = await client.query(
        `
        SELECT *
        FROM question q
        INNER JOIN lesson l
        ON q.lessonId = l.id
        WHERE q.lessonId=$1;
        `,
        [lessonId]
    );
    return result;
}

module.exports = {
    findQuestionBasedOnLesson
};