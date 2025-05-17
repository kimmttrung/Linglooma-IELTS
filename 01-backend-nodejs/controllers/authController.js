const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Hãy điền tất cả các thông tin" });
  }

  try {
    // Kiểm tra trùng username
    const existingUser = await User.findUser(username);
    if (!existingUser[0]) {
      return res.status(400).json({ msg: 'Tên người dùng đã tồn tại' });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    User.insertUser(username, hashedPassword)

    res.json({ msg: 'Đăng ký thành công', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Đã có lỗi xảy ra khi đăng ký', success: false });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Hãy điền tất cả các thông tin" });
  }

  try {
    const userResult = await User.findUser(username);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ msg: 'Sai tài khoản hoặc mật khẩu' });
    }

    const user = userResult.rows[0];

    // So sánh password gốc với hash đã lưu
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
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
