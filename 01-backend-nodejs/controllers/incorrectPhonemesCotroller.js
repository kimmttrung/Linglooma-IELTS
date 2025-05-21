const {insertIncorrectPhoneme, countIncorrectPhoneme} = require('../models/incorrectPhonemesModel');

// Thêm một phoneme sai
const insertIncorrectPhonemeController = async (req, res) => {
    const { phoneme, questionResultId } = req.body;

    if (!phoneme || !questionResultId) {
        return res.status(400).json({ error: 'phoneme and questionResultId are required' });
    }

    try {
        await insertIncorrectPhoneme(phoneme, questionResultId);
        res.status(201).json({ message: 'Incorrect phoneme inserted successfully' });
    } catch (error) {
        console.error('Error inserting incorrect phoneme:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Đếm số lần sai của mỗi phoneme theo questionResultId
const countIncorrectPhonemeController = async (req, res) => {
    const { questionResultId } = req.params;

    try {
        const result = await countIncorrectPhoneme(questionResultId);
        res.status(200).json(result.rows);  // Trả về kết quả dạng JSON
    } catch (error) {
        console.error('Error counting incorrect phonemes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    insertIncorrectPhonemeController,
    countIncorrectPhonemeController,
};
