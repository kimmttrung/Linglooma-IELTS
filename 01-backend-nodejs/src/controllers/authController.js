const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra trùng username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Tên người dùng đã tồn tại' });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ msg: 'Đăng ký thành công', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Đã có lỗi xảy ra khi đăng ký', success: false });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Sai tài khoản hoặc mật khẩu' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Ở đây bạn có thể tạo JWT hoặc session nếu muốn
      res.json({ redirect: '/dashboard.html' });
    } else {
      res.status(401).json({ msg: 'Sai mật khẩu' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Lỗi khi đăng nhập' });
  }
};
