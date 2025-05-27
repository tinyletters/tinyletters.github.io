import React from "react";
import { useNavigate } from "react-router-dom";

const ColorKeyStory = ({ bubbleData, colorMap }) => {
  const navigate = useNavigate();

  const sortedWords = bubbleData.sort((a, b) => b.value - a.value);

  const handleWordClick = (word) => {
    navigate(`/sentences/${word}`);
  };

  return (
    <div className="color-key-story">
      {sortedWords.map((bubble) => (
        <div
          key={bubble.name}
          className="color-key-item"
          onClick={() => handleWordClick(bubble.name)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="color-box"
            style={{
              fontSize: "10px",
              backgroundColor: colorMap[bubble.name] || "#8884d8",
              width: "40px",
              height: "10px",
              display: "inline-block",
              marginRight: "10px",
            }}
          ></div>
          <span className="key-word">{bubble.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorKeyStory;
