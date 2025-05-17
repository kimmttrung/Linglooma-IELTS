import React from "react";

/**
 * Highlight các từ sai trong câu, kèm tooltip lỗi khi hover
 * @param {string} text
 * @param {Array} wordsAssessment
 */
const HighlightTextWithTooltip = ({ text, wordsAssessment }) => {
  if (!wordsAssessment || wordsAssessment.length === 0) return <span>{text}</span>;

  const textWords = text.split(/\s+/);

  const wordMap = {};
  wordsAssessment.forEach(({ word, isCorrect, errorType }) => {
    wordMap[word.toLowerCase()] = { isCorrect, errorType };
  });

  return (
    <span>
      {textWords.map((w, i) => {
        const key = w.toLowerCase();
        const assessment = wordMap[key];

        if (assessment && !assessment.isCorrect) {
          return (
            <span
              key={i}
              style={{ color: "red", fontWeight: "bold", cursor: "help" }}
              title={`Pronunciation error: ${assessment.errorType}`}
            >
              {w}
              {i !== textWords.length - 1 ? " " : ""}
            </span>
          );
        }
        return w + (i !== textWords.length - 1 ? " " : "");
      })}
    </span>
  );
};

export default HighlightTextWithTooltip;
