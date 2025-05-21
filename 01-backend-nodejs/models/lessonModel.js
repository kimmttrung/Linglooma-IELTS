const client = require('../db');

const findLessonByType = async (type) => {
    const result = await client.query(
        'SELECT * FROM lesson WHERE type=$1',
        [type]
    );

    return result;
}
const findLessonById = async (id) => {
    const result = await client.query(
        'SELECT * FROM lesson WHERE id=$1',
        [id]
    );

    return result;
}

module.exports = {
    findLessonByType,
    findLessonById
}