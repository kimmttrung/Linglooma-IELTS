/**
 * Hàm tính điểm IELTS speaking dựa trên điểm Azure
 * @param {object} assessment - đối tượng PronunciationAssessment trả về từ Azure
 * @returns {object} chứa điểm band và feedback dạng text chi tiết
 */
function calculateIELTSBand(assessment) {
  const accuracy = assessment.AccuracyScore || 0;
  const fluency = assessment.FluencyScore || 0;
  const completeness = assessment.CompletenessScore || 0;
  const pronScore = assessment.PronScore || 0;

  // Trọng số từng phần
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

  // Quy đổi điểm tổng thành band IELTS
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

  // Feedback chi tiết từng phần
  let feedbackParts = [];

  if (accuracy >= 85) feedbackParts.push("Phát âm chính xác, ít lỗi sai từ.");
  else if (accuracy >= 70) feedbackParts.push("Phát âm khá tốt nhưng vẫn còn một số lỗi nhỏ.");
  else if (accuracy >= 50) feedbackParts.push("Phát âm chưa chuẩn, cần chú ý hơn.");
  else feedbackParts.push("Phát âm sai nhiều từ, cần luyện tập kỹ hơn.");

  if (fluency >= 85) feedbackParts.push("Lưu loát tự nhiên, ngữ điệu tốt.");
  else if (fluency >= 70) feedbackParts.push("Lưu loát khá, nhưng đôi lúc ngắt quãng.");
  else if (fluency >= 50) feedbackParts.push("Ngắt quãng nhiều, tốc độ chưa phù hợp.");
  else feedbackParts.push("Phát biểu chưa trôi chảy, cần cải thiện tốc độ và ngữ điệu.");

  if (completeness >= 85) feedbackParts.push("Phần nói đầy đủ, không bỏ sót ý.");
  else if (completeness >= 70) feedbackParts.push("Phần nói tương đối đầy đủ.");
  else if (completeness >= 50) feedbackParts.push("Có một số ý chưa được thể hiện rõ.");
  else feedbackParts.push("Nội dung chưa đầy đủ, cần bổ sung ý hơn.");

  if (pronScore >= 85) feedbackParts.push("Phát âm rõ ràng, dễ hiểu.");
  else if (pronScore >= 70) feedbackParts.push("Phát âm tốt nhưng cần luyện thêm về âm khó.");
  else if (pronScore >= 50) feedbackParts.push("Phát âm chưa tốt, dễ gây hiểu nhầm.");
  else feedbackParts.push("Phát âm yếu, nên luyện tập nhiều hơn.");

  let overallFeedback = "";
  if (band >= 8) overallFeedback = "Rất tốt! Giữ vững phong độ.";
  else if (band >= 6) overallFeedback = "Khá tốt, tiếp tục luyện tập để nâng cao.";
  else if (band >= 4) overallFeedback = "Cần cải thiện nhiều hơn nữa.";
  else overallFeedback = "Cần luyện tập và rèn luyện nhiều hơn.";

  const feedback = feedbackParts.join(" ") + " " + overallFeedback;

  return {
    band,
    totalScore: totalScore.toFixed(2),
    feedback,
  };
}

module.exports = { calculateIELTSBand };
