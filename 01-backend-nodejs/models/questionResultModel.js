const client = require('../db');

const insertQuestionResult = async (lessonResultId, questionId, score, errorPronouce, studentId) => {
    await client.query(
        `
        INSERT INTO questionResult (lessonResultId, questionId, score, errorPronouce, studentId)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [lessonResultId, questionId, score, errorPronouce, studentId]
    )
};

const getQuestionResultOfLesson = async (studentId, lessonResultId) => {
    const result = await client.query(
        `
        SELECT * 
        FROM questionResult qr
        INNER JOIN lessonResult lr 
        ON lr.id = qr.lessonResultId AND qr.studentId = lr.studentId
        WHERE qr.studentId=$1 AND qr.lessonResultId=$2;
        `,
        [studentId, lessonResultId]
    );

    return result;
};

module.exports = {
    insertQuestionResult, 
    getQuestionResultOfLesson, 
};