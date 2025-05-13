require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authController');
const connectDB = require('./configs/db');
const Transcript = require('./models/Transcript');

const app = express();
const port = process.env.PORT || 3000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);

// Route lưu transcript vào MongoDB
app.post('/api/save-transcript', async (req, res) => {
  const { transcript } = req.body;
  try {
    const saved = await Transcript.create({ transcript });
    console.log(`[+] Saved transcript at ${saved.createdAt}`);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ Error saving transcript:', err);
    res.status(500).json({ success: false, error: 'Failed to save transcript.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server đang chạy ở http://localhost:${port}`);
});
