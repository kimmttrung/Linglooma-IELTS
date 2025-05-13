const mongoose = require('mongoose');
require('dotenv').config({ path: './src/.env' });  // Đảm bảo dotenv được sử dụng để đọc biến môi trường từ file .env

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('❌ MONGO_URI is not defined in the .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Đã kết nối MongoDB');
  } catch (err) {
    console.error('❌ Lỗi kết nối MongoDB:', err);
    process.exit(1);  // Thoát chương trình nếu lỗi
  }
};

module.exports = connectDB;
