const client = require('../db');

const findUser = async (email) => {
    const result = await client.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    )

    return result;
}

const insertUser = async (email, hashedPassword) => {
    await client.query(
        'INSERT INTO users (email, password) VALUES ($1, $2)',
        [email, hashedPassword]
    );
}

const updateUser = async (email, username, password, gender, nationality, phoneNumber) => {
    await client.query(
        `
        UPDATE users
        SET username = $1,
            password = $2,
            gender = $3,
            nationality = $4,
            phoneNumber = $5
        WHERE email = $6;
        `,
        [username, password, gender, nationality, phoneNumber, email]
    );
};

const findUserByName = async (username) => {
    const result = await client.query(
        `
        SELECT * FROM users
        WHERE username=$1
        `,
        [username]
    );

    return result;
};

module.exports = {
    findUser,
    insertUser, 
    updateUser,
    findUserByName
};

