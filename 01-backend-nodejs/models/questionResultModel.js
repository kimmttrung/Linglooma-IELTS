const client = require('../db');

const insertQuestionResult = async (
    lessonResultId,
    questionId,
    ieltsBand,
    studentId,
    accuracy,
    fluency,
    completeness,
    pronunciation,
    feedback
) => {
    await client.query(
        `
        INSERT INTO questionResult (
            lessonResultId,
            questionId,
            ieltsBand,
            studentId,
            accuracy,
            fluency,
            completeness,
            pronunciation,
            feedback
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
        [
            lessonResultId,
            questionId,
            ieltsBand,
            studentId,
            accuracy,
            fluency,
            completeness,
            pronunciation,
            feedback
        ]
    );
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

// xử lý trường hợp ghi âm lại 
const getLastestQuestionResult = async (questionId, studentId, lessonId) => {
    const result =- await client.query(
        `
        SELECT *
        FROM questionresults
        WHERE questionId=$1 AND studentId=$2 AND lessonId = $3
        ORDER BY id DESC;
        `
    )

    return result;
}

module.exports = {
    insertQuestionResult, 
    getQuestionResultOfLesson, 
    getLastestQuestionResult
};