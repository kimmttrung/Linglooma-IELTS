import React from "react";

function HighlightText({ text, errorWords }) {
  if (!text) return null;
  const words = text.split(/(\s+)/);
  return (
    <p className="text-lg italic leading-relaxed select-text">
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,!?]/g, "").toLowerCase();
        const isError = errorWords.some(
          (ew) => ew.toLowerCase() === cleanWord
        );
        return (
          <span
            key={idx}
            className={isError ? "text-red-600 bg-red-100 underline" : ""}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

export default HighlightText;
