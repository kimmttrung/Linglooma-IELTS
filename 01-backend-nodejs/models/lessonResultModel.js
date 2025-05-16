const client = require('../db');

const insertLessonResult = async (studentId, lessonId, finishedTime, averageScore, feedback) => {
    await client.query(
        `
        INSERT INTO lessonResult (studentId, lessonId, finishedTime, averageScore, feedback) 
        VALUES ($1, $2, $3, $4, $5)
         `,
        [studentId, lessonId, finishedTime, averageScore, feedback]
    );
}

const getLessonResult = async (studentId, lessonId) => {
    const result = await client.query(
        'SELECT * FROM lessonResult WHERE studentId=$1 AND lessonId=$2',
        [studentId, lessonId]
    )

    return result; 
}

const getRecentlyLessonResult = async (studentId) => {
    const result = client.query(
        `
        SELECT * 
        FROM lessonresult
        WHERE studentId=$1
        ORDER BY finishedTime DESC
        LIMIT 7;
        `,
        [studentId]
    )

    return result;
}


module.exports = {
    insertLessonResult,
    getLessonResult,
    getRecentlyLessonResult
};
