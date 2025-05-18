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
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    await User.insertUser(email, hashedPassword);

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
      // Có thể tạo JWT ở đây nếu cần
      res.status(200).json({
        msg: 'Login successful',
        success: true,
        user: { email: user.email } // hoặc thêm userId, token nếu có
      });
    } else {
      res.status(401).json({ msg: 'Retriving user failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Login failed' });
  }
};
