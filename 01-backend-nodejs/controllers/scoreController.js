const path = require("path");
const fs = require("fs");
const { saveBase64AudioToFile } = require("../utils/fileUtils");
const { assessPronunciation } = require("../services/azurePronunciationService");
const { calculateIELTSBand } = require("../services/ieltsScoringService");

exports.scoreAudio = async (req, res) => {
  try {
    const { audio, referenceText } = req.body;

    if (!audio) return res.status(400).json({ error: "Thiếu dữ liệu audio" });
    if (!referenceText || referenceText.trim() === "")
      return res.status(400).json({ error: "Thiếu câu mẫu (referenceText)" });

    const filename = `audio_${Date.now()}.wav`;
    const filepath = path.join(__dirname, "..", "temp", filename);

    await saveBase64AudioToFile(audio, filepath);

    const assessment = await assessPronunciation(filepath, referenceText);

    fs.unlink(filepath, (err) => {
      if (err) console.error("Lỗi xóa file tạm:", err);
    });

    // Tính điểm band IELTS từ kết quả đánh giá Azure
    const ieltsResult = calculateIELTSBand(assessment);

    // Trả thêm điểm từng phần riêng lẻ
    res.json({
      score: ieltsResult.band,
      rawScore: ieltsResult.totalScore,
      feedback: ieltsResult.feedback,
      accuracyScore: assessment.AccuracyScore || null,
      fluencyScore: assessment.FluencyScore || null,
      completenessScore: assessment.CompletenessScore || null,
      pronScore: assessment.PronScore || null,
      details: assessment,
    });
  } catch (error) {
    console.error("Lỗi khi chấm điểm:", error);
    res.status(500).json({ error: "Lỗi server khi chấm điểm" });
  }
};