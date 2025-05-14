// middlewares/upload.js

const multer = require('multer');
const path = require('path');

// Định nghĩa nơi lưu và tên file ghi âm
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null, `recording-${timestamp}.webm`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
