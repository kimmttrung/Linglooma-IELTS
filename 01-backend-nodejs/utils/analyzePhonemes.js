    /**
     * Phân tích và in điểm từng phoneme (âm) trong kết quả đánh giá phát âm
     * @param {object} result - Kết quả đánh giá phát âm từ Azure hoặc tương tự
     */
function analyzePhonemes(result) {
  if (!result.detailResult || !result.detailResult.Words) {
    return null; // hoặc []
  }

  const phonemeDetails = [];

  result.detailResult.Words.forEach((word, wordIndex) => {
    if (word.PronunciationAssessment && word.PronunciationAssessment.Phonemes) {
      word.PronunciationAssessment.Phonemes.forEach((phoneme, phonemeIndex) => {
        phonemeDetails.push({
          wordIndex,
          word: word.Word,
          phonemeIndex,
          phoneme: phoneme.Phoneme,
          accuracyScore: phoneme.AccuracyScore,
          errorType: phoneme.ErrorType || "Good",
        });
      });
    }
  });

  return phonemeDetails;
}

module.exports = { analyzePhonemes };
