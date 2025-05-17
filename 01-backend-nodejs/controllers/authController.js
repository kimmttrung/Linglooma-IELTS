const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Kiểm tra trùng email
    const existingUser = await User.findUser(email);
    if (!existingUser[0]) {
      return res.status(400).json({ msg: 'User have already existed' });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    User.insertUser(email, hashedPassword)

    res.json({ msg: 'Register successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Register failed', success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userResult = await User.findUser(email);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ msg: 'Email or password is wrong' });
    }

    const user = userResult.rows[0];

    // So sánh password gốc với hash đã lưu
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Ở đây bạn có thể tạo JWT hoặc session nếu muốn
      res.json({ redirect: '/dashboard.html' });
    } else {
      res.status(401).json({ msg: 'Retriving user failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Login failed' });
  }
};
