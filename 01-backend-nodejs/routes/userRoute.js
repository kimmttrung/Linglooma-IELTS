const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/', userController.updateUserController);

module.exports = router;
