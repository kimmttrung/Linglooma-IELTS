const client = require('../db');

const findUser = async (email) => {
    const result = client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    return result;
}

const insertUser = async (email, hashedPassword) => {
    client.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hashedPassword]
    );
}

module.exports = {
    findUser,
    insertUser
};

