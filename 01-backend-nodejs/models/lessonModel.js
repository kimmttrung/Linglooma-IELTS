const client = require('../db');

const findLesson = async (type) => {
    const result = await client.query(
        'SELECT * FROM lesson WHERE type=$1',
        [type]
    );

    return result;
}

module.exports = {
    findLesson
}