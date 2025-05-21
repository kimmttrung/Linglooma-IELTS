const client = require('../db');

const insertIncorrectPhoneme = async (phoneme, questionResultId) => {
    await client.query(
        `
        INSERT INTO incorrectPhoneme (phoneme, questionResultId)
        VALUES ($1, $2)
        `,
        [phoneme, questionResultId]
    );
}

const countIncorrectPhoneme = async (questionResultId) => {
    const result = await client.query(
        `
        SELECT phoneme, COUNT(*) AS errorTimes
        FROM incorrectphonemes
        WHERE questionResultId = $1
        GROUP BY phoneme;
        `,
        [questionResultId]
    );

    return result;
}

module.exports = {
    insertIncorrectPhoneme,
    countIncorrectPhoneme

}