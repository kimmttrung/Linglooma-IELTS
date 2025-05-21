const client = require('../db');

const lastestScore = 7;

const insertLessonResult = async (studentId, lessonId, finishedTime, averageScore, feedback) => {
    await client.query(
        `
        INSERT INTO lessonResult (studentId, lessonId, finishedTime, averageScore, feedback) 
        VALUES ($1, $2, $3, $4, $5)
         `,
        [studentId, lessonId, finishedTime, averageScore, feedback]
    );
}

const insertLessonResultById = async (studentId, lessonId) => {
    await client.query(
        `
        INSERT INTO lessonResult (studentId, lessonId)
        VALUES ($1, $2)
         `,
        [studentId, lessonId]
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
        LIMIT $2;
        `,
        [studentId, lastestScore]
    )

    return result;
}


module.exports = {
    insertLessonResult,
    getLessonResult,
    getRecentlyLessonResult,
    insertLessonResultById  
};
