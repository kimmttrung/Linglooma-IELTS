// 
function analyzePhonemes(result) {
  if (!result || !result.wordsAssessment || !Array.isArray(result.wordsAssessment)) {
    return [];
  }

  const phonemeDetails = [];
  result.wordsAssessment.forEach((wordAssessment, wordIndex) => {
    if (wordAssessment.phonemes && Array.isArray(wordAssessment.phonemes)) {
      wordAssessment.phonemes.forEach((phoneme, phonemeIndex) => {
        phonemeDetails.push({
          wordIndex,
          word: wordAssessment.word,
          phonemeIndex,
          phoneme: phoneme.phoneme || "",
          accuracyScore: phoneme.accuracyScore || 0,
          errorType: phoneme.errorType || "Good",
        });
      });
    }
  });

  return phonemeDetails;
}

function generateStandardIPA(result) {
  if (!result || !result.wordsAssessment || !Array.isArray(result.wordsAssessment)) {
    return "";
  }

  const ipaParts = result.wordsAssessment
    .map((w) => {
      const phonemes = w.phonemes || [];
      return phonemes.length ? `/${phonemes.map((p) => p.phoneme).join("")}/` : "";
    })
    .filter(Boolean);

  return ipaParts.length ? ipaParts.join(" ") : "Không có phiên âm chuẩn";
}

function findIncorrectPhonemes(result) {
  if (!result || !result.wordsAssessment || !Array.isArray(result.wordsAssessment)) {
    return [];
  }

  const incorrectPhonemes = [];
  result.wordsAssessment.forEach((wordAssessment) => {
    if (wordAssessment.phonemes && Array.isArray(wordAssessment.phonemes)) {
      wordAssessment.phonemes.forEach((phoneme) => {
        if (phoneme.accuracyScore < 50 || phoneme.errorType !== "None") {
          incorrectPhonemes.push({
            word: wordAssessment.word,
            expected: phoneme.phoneme || "",
            actual: phoneme.phoneme || "",
            accuracyScore: phoneme.accuracyScore || 0,
            errorType: phoneme.errorType || "Mispronunciation",
          });
        }
      });
    }
  });

  return incorrectPhonemes;
}

module.exports = { analyzePhonemes, generateStandardIPA, findIncorrectPhonemes };