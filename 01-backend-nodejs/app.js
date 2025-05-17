const express = require("express");
const cors = require("cors");

const scoreRoutes = require("./routes/scoreRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" })); // tăng giới hạn size vì audio base64 có thể lớn

app.use("/api", scoreRoutes);
app.use("/api", questionRoutes)

// 404 handler đặt cuối cùng
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
