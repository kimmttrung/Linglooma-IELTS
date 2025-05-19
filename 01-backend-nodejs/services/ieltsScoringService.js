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
  feedbackParts.push("Độ hoàn chỉnh: Đọc câu đầy đủ, rõ ràng, không bỏ sót phần nào.");
else if (completeness >= 6.5)
  feedbackParts.push("Độ hoàn chỉnh: Đọc câu khá đầy đủ, chỉ thi thoảng bỏ sót hoặc đọc thiếu một vài từ.");
else if (completeness >= 5)
  feedbackParts.push("Độ hoàn chỉnh: Đọc còn thiếu một số phần, câu chưa được hoàn chỉnh.");
else
  feedbackParts.push("Độ hoàn chỉnh: Đọc không rõ nhiều phần, câu không đầy đủ gây khó hiểu.");

if (accuracy >= 8)
  feedbackParts.push("Độ chính xác: Phát âm chuẩn xác, ít sai sót, rất dễ hiểu.");
else if (accuracy >= 6.5)
  feedbackParts.push("Độ chính xác: Phát âm tương đối đúng, chỉ mắc vài lỗi nhỏ.");
else if (accuracy >= 5)
  feedbackParts.push("Độ chính xác: Phát âm còn sai sót, nhưng người nghe vẫn hiểu được.");
else
  feedbackParts.push("Độ chính xác: Nhiều lỗi phát âm, gây khó khăn khi nghe hiểu.");

if (pronunciation >= 8)
  feedbackParts.push("Phát âm: Sử dụng nhiều đặc điểm phát âm chuẩn xác và rõ ràng.");
else if (pronunciation >= 6.5)
  feedbackParts.push("Phát âm: Phát âm rõ ràng, đôi khi có lỗi nhỏ.");
else if (pronunciation >= 5)
  feedbackParts.push("Phát âm: Một số lỗi phát âm gây khó khăn cho người nghe.");
else
  feedbackParts.push("Phát âm: Lỗi phát âm thường xuyên, gây khó hiểu.");

let advice = "";

if (band >= 8) {
  advice = "Lời khuyên: Bạn đã rất xuất sắc rồi, chỉ cần duy trì và luyện tập thêm để giữ phong độ. Hãy tiếp tục mở rộng vốn từ, luyện nghe nói đa dạng chủ đề và luyện phát âm tinh tế hơn để hoàn thiện hơn nữa.";
} else if (band >= 6.5) {
  advice = "Lời khuyên: Bạn đã khá tốt nhưng vẫn còn vài lỗi nhỏ. Hãy chú ý luyện nói trôi chảy hơn bằng cách thực hành nói thường xuyên, ghi âm để tự nghe và sửa lỗi. Tăng cường học từ vựng và cấu trúc ngữ pháp để nâng cao độ chính xác.";
} else if (band >= 5) {
  advice = "Lời khuyên: Bạn cần tập trung cải thiện kỹ năng phát âm và mạch lạc. Hãy luyện nghe phát âm chuẩn qua các nguồn uy tín, tập nói theo mẫu và làm bài tập phát âm từng âm. Thực hành nói đều đặn, có thể tìm đối tác luyện tập hoặc thầy cô để được phản hồi kịp thời.";
} else {
  advice = "Lời khuyên: Bạn nên bắt đầu luyện tập từ những bước cơ bản như luyện phát âm chuẩn, học lại các cấu trúc ngữ pháp đơn giản và tập nói từng câu ngắn. Đừng ngại sai, hãy luyện tập thật nhiều qua nghe – nói – đọc – viết. Nên tham gia các lớp học hoặc nhóm luyện nói để được hỗ trợ.";
}

const feedback = feedbackParts.join("\n") + "\n" + advice;

  return {
    band,
    totalScore: weightedAverage.toFixed(2),
    feedback,
  };
}

module.exports = { calculateIELTSBand };
