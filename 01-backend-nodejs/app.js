const express = require("express");
const cors = require("cors");

const scoreRoutes = require("./routes/scoreRoutes");
// route dữ liệu 
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require("./routes/lessonRoute");
const lessonResultRoutes = require('./routes/lessonResultRoute');
const questionRoutes = require('./routes/questionRoute');
const questionResultRoutes = require('./routes/questionResultRoute')

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" })); // tăng giới hạn size vì audio base64 có thể lớn

app.use("/api", scoreRoutes);
app.use("/api", questionRoutes)

// truy xuất dữ liệu 
app.use("/api", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lessons/results", lessonResultRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions/results", questionResultRoutes);

// 404 handler đặt cuối cùng
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
