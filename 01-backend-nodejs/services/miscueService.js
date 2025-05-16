/**
 * So sánh câu mẫu (referenceText) với transcript (text chuyển giọng nói thành text)
 * Trả về mảng từ trong câu mẫu bị đọc sai hoặc bỏ sót (không có trong transcript)
 * 
 * @param {string} referenceText - câu mẫu (chuẩn)
 * @param {string} transcriptText - câu được nhận dạng từ giọng nói
 * @returns {string[]} mảng các từ sai hoặc thiếu trong transcript
 */
function findMismatchedWords(referenceText, transcriptText) {
  if (!referenceText || !transcriptText) return [];

  // Tách từ, chuyển về chữ thường, loại bỏ dấu câu
  const clean = (text) =>
    text
      .toLowerCase()
      .replace(/[.,!?;:"'`~()\[\]{}]/g, "")
      .split(/\s+/)
      .filter(Boolean);

  const refWords = clean(referenceText);
  const transWords = clean(transcriptText);

  // Tìm từ trong refWords mà không có trong transcript (bỏ sót hoặc phát âm sai dẫn ASR không nhận)
  const missingWords = refWords.filter((word) => !transWords.includes(word));

  return missingWords;
}

module.exports = { findMismatchedWords };
