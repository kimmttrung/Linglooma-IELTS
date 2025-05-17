// controllers/record.controller.js

const path = require('path');
const fs = require('fs');

// Đường dẫn thư mục để lưu file ghi âm
const uploadDirectory = path.join(__dirname, '../uploads');

// Đảm bảo thư mục uploads tồn tại
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const uploadRecording = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No recording file was uploaded' });
  }

  console.log('Received file:', req.file.originalname);
  res.status(200).json({ message: 'Recording uploaded successfully' });
};

module.exports = {
  uploadRecording,
};
