/**
 * Hàm tính điểm IELTS speaking chuẩn dựa trên điểm Azure và trả feedback sát thực tế
 * @param {object} assessment
 * @returns {object}
 */
function calculateIELTSBand(assessment) {
  const accuracyRaw = assessment.AccuracyScore || 0;      // tương tự Grammar+Accuracy trong IELTS
  const fluencyRaw = assessment.FluencyScore || 0;    
  const completenessRaw = assessment.CompletenessScore || 0; 
  const pronScoreRaw = assessment.PronScore || 0;          // Pronunciation

  // Chuẩn hóa điểm về thang 0-9
  const scaleTo9 = (score) => (score / 100) * 9;

  const accuracy = scaleTo9(accuracyRaw);
  const fluency = scaleTo9(fluencyRaw);
  const completeness = scaleTo9(completenessRaw);
  const pronunciation = scaleTo9(pronScoreRaw);

  const weights = {
    accuracy: 0.25,
    fluency: 0.2,
    completeness: 0.25,
    pronunciation: 0.3,
  };

  const weightedAverage =
    accuracy * weights.accuracy +
    fluency * weights.fluency +
    completeness * weights.completeness +
    pronunciation * weights.pronunciation;

  function roundBand(score) {
    const floor = Math.floor(score);
    const diff = score - floor;

    if (diff < 0.25) return floor;
    else if (diff < 0.75) return floor + 0.5;
    else return floor + 1;
  }

  const band = roundBand(weightedAverage);

const feedbackParts = [];

if (fluency >= 8)
  feedbackParts.push("Lưu loát và mạch lạc: Nói trôi chảy, chỉ thỉnh thoảng lặp lại hoặc tự sửa lỗi.");
else if (fluency >= 6.5)
  feedbackParts.push("Lưu loát và mạch lạc: Nói khá trôi chảy, đôi khi ngắt quãng hoặc lặp lại.");
else if (fluency >= 5)
  feedbackParts.push("Lưu loát và mạch lạc: Có một số ngắt quãng và lặp lại, khó duy trì mạch nói.");
else
  feedbackParts.push("Lưu loát và mạch lạc: Thường xuyên ngắt quãng và lặp lại, câu nói thiếu mạch lạc.");

if (completeness >= 8)
  feedbackParts.push("Từ vựng: Sử dụng vốn từ phong phú, tự nhiên và chính xác.");
else if (completeness >= 6.5)
  feedbackParts.push("Từ vựng: Vốn từ đủ dùng, có sự linh hoạt nhất định.");
else if (completeness >= 5)
  feedbackParts.push("Từ vựng: Vốn từ hạn chế, hay dùng từ đơn giản hoặc lặp lại.");
else
  feedbackParts.push("Từ vựng: Vốn từ rất hạn chế, thường xuyên sai sót trong lựa chọn từ.");

if (accuracy >= 8)
  feedbackParts.push("Ngữ pháp: Sử dụng đa dạng cấu trúc với rất ít lỗi.");
else if (accuracy >= 6.5)
  feedbackParts.push("Ngữ pháp: Kiểm soát tốt, lỗi sai không thường xuyên.");
else if (accuracy >= 5)
  feedbackParts.push("Ngữ pháp: Kiểm soát hạn chế, lỗi sai thường xuyên nhưng vẫn hiểu được ý.");
else
  feedbackParts.push("Ngữ pháp: Lỗi sai nhiều và thường gây khó hiểu.");

if (pronunciation >= 8)
  feedbackParts.push("Phát âm: Sử dụng nhiều đặc điểm phát âm chuẩn xác và rõ ràng.");
else if (pronunciation >= 6.5)
  feedbackParts.push("Phát âm: Phát âm rõ ràng, đôi khi có lỗi nhỏ.");
else if (pronunciation >= 5)
  feedbackParts.push("Phát âm: Một số lỗi phát âm gây khó khăn cho người nghe.");
else
  feedbackParts.push("Phát âm: Lỗi phát âm thường xuyên, gây khó hiểu.");

let overallFeedback = "";
if (band >= 8)
  overallFeedback = "Tổng thể: Người nói rất thành thạo, kiểm soát ngôn ngữ xuất sắc.";
else if (band >= 6.5)
  overallFeedback = "Tổng thể: Người nói có khả năng sử dụng tiếng Anh hiệu quả dù còn một số lỗi.";
else if (band >= 5)
  overallFeedback = "Tổng thể: Người nói có khả năng giao tiếp cơ bản, nhưng còn nhiều hạn chế.";
else
  overallFeedback = "Tổng thể: Người nói còn hạn chế, giao tiếp còn nhiều khó khăn.";

const feedback = feedbackParts.join("\n") + "\n" + overallFeedback;

  return {
    band,
    totalScore: weightedAverage.toFixed(2),
    feedback,
  };
}

module.exports = { calculateIELTSBand };
