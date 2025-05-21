const client = require('../db');

const lastestScore = 7;

async function insertLessonResult({ studentId, lessonId, finishedTime, averageScore, feedback }) {
  const query = `
    INSERT INTO lessonResult (studentId, lessonId, finishedTime, averageScore, feedback)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [studentId, lessonId, finishedTime, averageScore, feedback];

  const res = await client.query(query, values);
  return res.rows[0];
}


const getLessonResult = async (studentId, lessonId) => {
    await client.query(
        'SELECT * FROM lessonResult WHERE studentId=$1 AND lessonId=$2',
        [studentId, lessonId]
    );
}

const getRecentlyLessonResult = async (studentId) => {
    client.query(
        `
        SELECT * 
        FROM lessonresult
        WHERE studentId=$1
        ORDER BY finishedTime DESC
        LIMIT $2;
        `,
        [studentId, lastestScore]
    );
}


module.exports = {
    insertLessonResult,
    getLessonResult,
    getRecentlyLessonResult
};
