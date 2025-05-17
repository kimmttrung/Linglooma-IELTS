function translateErrorTypeToVietnamese(errorType) {
  switch (errorType) {
    case "None":
      return "Không có lỗi phát âm";
    case "Good":
      return "Phát âm đúng";
    case "Insertion":
      return "Chèn thêm âm hoặc từ không có trong câu mẫu";
    case "Deletion":
      return "Bỏ sót âm trong từ";
    case "Omission":
      return "Bỏ sót từ hoặc âm";
    case "Substitution":
      return "Phát âm sai";
    case "Mispronunciation":
      return "Phát âm sai";
    case "Unknown":
      return "Lỗi không xác định hoặc không phân loại rõ";
    default:
      return `Lỗi không xác định (${errorType})`;
  }
}

function vietnameseWordsAssessment(wordsAssessment) {
  if (!Array.isArray(wordsAssessment)) return [];

  return wordsAssessment.map(({ word, accuracyScore, errorType, isCorrect }) => ({
    word,
    accuracyScore,
    errorType: translateErrorTypeToVietnamese(errorType),
    isCorrect,
  }));
}

module.exports = {
  translateErrorTypeToVietnamese,
  vietnameseWordsAssessment,
};
