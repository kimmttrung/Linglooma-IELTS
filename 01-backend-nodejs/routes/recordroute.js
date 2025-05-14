// routes/record.routes.js

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const recordController = require('../controllers/record.controller');

// POST /upload
router.post('/upload', upload.single('audio'), recordController.uploadRecording);

module.exports = router;
