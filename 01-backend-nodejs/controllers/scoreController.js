const path = require("path");
const fs = require("fs");
const { saveBase64AudioToFile } = require("../utils/fileUtils");
const { assessPronunciation } = require("../services/azurePronunciationService");
const { calculateIELTSBand } = require("../services/ieltsScoringService");
const { findMismatchedWords } = require("../services/miscueService");
const { analyzePhonemes } = require("../utils/analyzePhonemes");
const { vietnameseWordsAssessment } = require("../utils/wordsAssessmentHelper");
const { analyzePhonemes } = require("../utils/analyzePhonemes");
const { vietnameseWordsAssessment } = require("../utils/wordsAssessmentHelper");

exports.scoreAudio = async (req, res) => {
  try {
    const { audio, referenceText } = req.body;

    if (!audio) return res.status(400).json({ error: "Missing audio data" });
    if (!referenceText || referenceText.trim() === "")
      return res.status(400).json({ error: "Missing reference sentence (referenceText)" });

    const filename = `audio_${Date.now()}.wav`;
    const filepath = path.join(__dirname, "..", "temp", filename);

    await saveBase64AudioToFile(audio, filepath);

    const { assessment, transcriptText, wordsAssessment } = await assessPronunciation(filepath, referenceText);
    const { assessment, transcriptText, wordsAssessment } = await assessPronunciation(filepath, referenceText);

    const miscueWordsFromTranscript = findMismatchedWords(referenceText, transcriptText);

    // Delete temp file
    // Xóa file tạm
    fs.unlink(filepath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    const ieltsResult = calculateIELTSBand(assessment);
    const phonemeDetails = analyzePhonemes(assessment);
    const wordsAssessmentVn = vietnameseWordsAssessment(wordsAssessment);
    const phonemeDetails = analyzePhonemes(assessment);
    const wordsAssessmentVn = vietnameseWordsAssessment(wordsAssessment);

    res.json({
      score: ieltsResult.band,
      rawScore: ieltsResult.totalScore,
      feedback: ieltsResult.feedback,
      accuracyScore: assessment.AccuracyScore || null,
      fluencyScore: assessment.FluencyScore || null,
      completenessScore: assessment.CompletenessScore || null,
      pronScore: assessment.PronScore || null,
      transcript: transcriptText,
      miscueWords: miscueWordsFromTranscript,
      phonemeDetails,
      wordsAssessment: wordsAssessmentVn,
      phonemeDetails,
      wordsAssessment: wordsAssessmentVn,
      details: assessment,
    });
  } catch (error) {
    console.error("Error scoring:", error);
    res.status(500).json({ error: "Server error while scoring" });
  }
};