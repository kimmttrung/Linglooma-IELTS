const {updateUser, findUserByName} = require('../models/userModel');

const updateUserController = async (req, res) => {   
    const {email, username, password, gender, nationality, phoneNumber} = req.body;

    const user = await findUserByName(username);

    if (user.rows.length > 0) {
        return res.status(400).json({message: "Username already existed"})
    }

    if (!email) {
        return res.status(400).json({message: "Missing email"});
    }

    try {
        await updateUser(email, username, password, gender, nationality, phoneNumber);
        res.status(200).json({message: "Update user successfully"});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Error updating data"});
    }
}

module.exports = {
    updateUserController
}