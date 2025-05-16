const client = require('../db');

const findUser = async (username) => {
    const result = client.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
    )

    return result;
}

const insertUser = async (username, hashedPassword) => {
    client.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, hashedPassword]
    );
}

module.exports = {
    findUser,
    insertUser
};

