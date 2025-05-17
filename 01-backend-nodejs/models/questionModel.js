const client = require('../db');

const findQuestionBasedOnLesson = async (lessonId) => {

    const result = await client.query(
        'SELECT * FROM question WHERE lessonId=$1',
        [lessonId]
    );
    return result;
}

module.exports = {
    findQuestionBasedOnLesson
};