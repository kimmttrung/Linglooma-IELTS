const client = require('../db');

// Hàm thêm hoặc cập nhật số lần sai cho 1 phoneme
const upsertIncorrectPhoneme = async (phoneme, count, questionResultId, lessonResultId, questionId, studentId) => {
  // Kiểm tra xem phoneme đã tồn tại chưa
  const checkExistResult = await client.query(
    `
    SELECT id, incorrect_count 
    FROM incorrectphonemes 
    WHERE phoneme = $1 
      AND questionResultId = $2
      AND lessonResultId = $3
      AND questionId = $4
      AND studentId = $5
    `,
    [phoneme, questionResultId, lessonResultId, questionId, studentId]
  );

  if (checkExistResult.rows.length > 0) {
    const existingRecord = checkExistResult.rows[0];
    const newCount = existingRecord.incorrect_count + count;

    await client.query(
      `
      UPDATE incorrectphonemes
      SET incorrect_count = $1
      WHERE id = $2
      `,
      [newCount, existingRecord.id]
    );
  } else {
    await client.query(
      `
      INSERT INTO incorrectphonemes (phoneme, questionResultId, lessonResultId, questionId, studentId, incorrect_count)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [phoneme, questionResultId, lessonResultId, questionId, studentId, count]
    );
  }
};

// Hàm xử lý map phoneme => count, gọi upsert cho từng phoneme
const insertOrUpdateIncorrectPhonemes = async (errorMap, questionResultId, lessonResultId, questionId, studentId) => {
  for (const [phoneme, count] of Object.entries(errorMap)) {
    await upsertIncorrectPhoneme(phoneme, count, questionResultId, lessonResultId, questionId, studentId);
  }
};

// Lấy tất cả phonemes sai của một học viên cho một câu hỏi trong bài học
const getIncorrectPhonemesOfLesson = async (studentId, lessonResultId) => {
  const result = await client.query(
    `
    SELECT * 
    FROM incorrectphonemes ip
    INNER JOIN lessonResult lr
      ON ip.lessonResultId = lr.id
    INNER JOIN question q
      ON ip.questionId = q.id
    WHERE ip.studentId = $1 AND ip.lessonResultId = $2
    `,
    [studentId, lessonResultId]
  );

  return result.rows;
};

module.exports = {
  upsertIncorrectPhoneme,
  insertOrUpdateIncorrectPhonemes,
  getIncorrectPhonemesOfLesson,
};
