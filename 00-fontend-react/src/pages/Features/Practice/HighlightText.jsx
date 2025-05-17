import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const HighlightTextWithTooltip = ({ text, wordsAssessment }) => {
  if (!wordsAssessment || wordsAssessment.length === 0) return <span>{text}</span>;

  const textWords = text.split(/\s+/);
  const wordMap = {};
  wordsAssessment.forEach(({ word, isCorrect, errorType }, index) => {
    wordMap[word.toLowerCase()] = { isCorrect, errorType, id: `word-${index}` };
  });

  const tooltips = wordsAssessment
    .filter(w => !w.isCorrect)
    .map(({ errorType, id }) => <Tooltip key={id} id={id} place="top" />);

  return (
    <>
      {textWords.map((w, i) => {
        const key = w.toLowerCase();
        const assessment = wordMap[key];

        if (assessment && !assessment.isCorrect) {
          return (
            <React.Fragment key={i}>
              <span
                data-tooltip-id={assessment.id}
                data-tooltip-content={`Lỗi phát âm: ${assessment.errorType}`}
                style={{
                  color: "red",
                  fontWeight: "700",
                  cursor: "help",
                  textDecoration: "underline",
                  textDecorationColor: "red",
                }}
              >
                {w}
              </span>
              {i !== textWords.length - 1 ? " " : ""}
            </React.Fragment>
          );
        }
        // Trả về JSX cho từ đúng để giữ khoảng trắng chuẩn
        return (
          <React.Fragment key={i}>
            {w}
            {i !== textWords.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
      {tooltips}
    </>
  );
};

export default HighlightTextWithTooltip;
