/**
 * Đếm số lần mỗi phoneme bị lỗi trong mảng wordsAssessment
 * @param {Array} wordsAssessment - Mảng đối tượng đánh giá từng từ, mỗi từ có mảng phonemes
 * @returns {Object} errorMap - Object key là phoneme, value là số lần lỗi
 */
function countPhonemeErrors(wordsAssessment) {
  const errorMap = {};

  wordsAssessment.forEach(wordObj => {
    if (!wordObj.phonemes || !Array.isArray(wordObj.phonemes)) return;

    wordObj.phonemes.forEach(phonemeObj => {
      if (phonemeObj.accuracyScore < 50 || phonemeObj.errorType !== "None") {
        const key = phonemeObj.phoneme;
        if (errorMap[key]) {
          errorMap[key] += 1;
        } else {
          errorMap[key] = 1;
        }
      }
    });
  });

  return errorMap;
}

module.exports = { countPhonemeErrors };
