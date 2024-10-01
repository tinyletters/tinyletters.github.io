import React from 'react';
import colorMap from './ColorMap'; 

const ColorKey = ({ wordFrequency, colorMap, setHoveredWord }) => {
    // Filter out words with a frequency less than 2 and then sort by word frequency in descending order
    const sortedWords = Object.keys(wordFrequency)
      .filter((word) => colorMap[word] && wordFrequency[word] >= 2)
      .sort((a, b) => wordFrequency[b] - wordFrequency[a]); // Sort by frequency descending
  
    return (
      <div className="color-key">
        {sortedWords.map((word) => (
          <div
            key={word}
            className="color-key-item"
            onMouseEnter={() => setHoveredWord(word)} // Set hovered word on enter
            onMouseLeave={() => setHoveredWord(null)} // Clear hovered word on leave
          >
            <div
              className="color-box"
              style={{
                fontSize: "10px",
                backgroundColor: colorMap[word] || "#8884d8",
                width: "40px",
                height: "10px",
                display: "inline-block",
                marginRight: "10px",
              }}
            ></div>
            <span className="key-word">{word}</span>
          </div>
        ))}
      </div>
    );
  };
  
export default ColorKey;
