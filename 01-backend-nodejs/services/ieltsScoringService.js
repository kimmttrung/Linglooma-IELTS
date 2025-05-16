// ieltsScoringService.js

/**
 * Hàm tính điểm IELTS speaking dựa trên điểm Azure
 * @param {object} assessment - đối tượng PronunciationAssessment trả về từ Azure
 * @returns {object} chứa điểm band và feedback dạng text
 */
function calculateIELTSBand(assessment) {
  const accuracy = assessment.AccuracyScore || 0;
  const fluency = assessment.FluencyScore || 0;
  const completeness = assessment.CompletenessScore || 0;
  const pronScore = assessment.PronScore || 0;

  // Ví dụ trọng số từng phần (bạn có thể điều chỉnh)
  const weights = {
    accuracy: 0.2,
    fluency: 0.3,
    completeness: 0.1,
    pronScore: 0.4,
  };

  const totalScore =
    accuracy * weights.accuracy +
    fluency * weights.fluency +
    completeness * weights.completeness +
    pronScore * weights.pronScore;

  // Quy đổi điểm tổng thành band IELTS 0-9
  let band = 0;
  if (totalScore >= 90) band = 9;
  else if (totalScore >= 80) band = 8;
  else if (totalScore >= 70) band = 7;
  else if (totalScore >= 60) band = 6;
  else if (totalScore >= 50) band = 5;
  else if (totalScore >= 40) band = 4;
  else if (totalScore >= 30) band = 3;
  else if (totalScore >= 20) band = 2;
  else band = 1;

  // Tạo feedback đơn giản
  let feedback = "";
  if (band >= 8) feedback = "Rất tốt! Phát âm rõ ràng và tự nhiên.";
  else if (band >= 6)
    feedback = "Tốt, nhưng bạn nên luyện thêm về ngữ điệu và lưu loát.";
  else if (band >= 4)
    feedback = "Trung bình, cần cải thiện nhiều về phát âm và ngữ pháp.";
  else feedback = "Cần luyện tập kỹ hơn về phát âm và chính xác.";

  return {
    band,
    totalScore: totalScore.toFixed(2),
    feedback,
  };
}

module.exports = { calculateIELTSBand };
