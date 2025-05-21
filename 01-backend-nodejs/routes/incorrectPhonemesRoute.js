const express = require('express');
const router = express.Router();
const incorrectPhonemesController = require('../controllers/incorrectPhonemesController');

// Route để thêm phoneme sai
router.post('/', incorrectPhonemesController.insertIncorrectPhoneme);

// Route để đếm số lần sai của phoneme
router.get('/:questionResultId', incorrectPhonemesController.countIncorrectPhoneme);

module.exports = router;
