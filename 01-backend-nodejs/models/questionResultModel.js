const client = require('../db');

const insertQuestionResult = async (
  studentId,
  lessonResultId,
  questionId,
  ieltsBand,
  accuracy,
  fluency,
  completeness,
  pronunciation,
  feedback
) => {
  await client.query(
    `
    INSERT INTO questionResult
      (studentId, lessonResultId, questionId, ieltsBand, accuracy, fluency, completeness, pronunciation, feedback)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [studentId, lessonResultId, questionId, ieltsBand, accuracy, fluency, completeness, pronunciation, feedback]
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

module.exports = {
    insertQuestionResult, 
    getQuestionResultOfLesson, 
};