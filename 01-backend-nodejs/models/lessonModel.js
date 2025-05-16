const client = require('../db');

const findLesson = async () => {
    const result = await client.query(
        'SELECT * FROM lesson'
    );

    return result;
}

module.exports = {
    findLesson
}