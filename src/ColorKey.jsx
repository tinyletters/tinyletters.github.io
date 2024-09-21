import React from 'react';

const ColorKey = ({ wordFrequency, colorMap }) => {
  // Sort the words by frequency in descending order
  const sortedWords = Object.keys(wordFrequency)
    .filter((word) => colorMap[word]) // Only include words that have a color defined
    .sort((a, b) => wordFrequency[b] - wordFrequency[a]);

  return (
    <div className="color-key">
      {sortedWords.map((word) => (
        <div key={word} className="color-key-item">
          <div
            className="color-box"
            style={{
                fontSize: "10px",
              backgroundColor: colorMap[word] || '#8884d8',
              width: '40px',
              height: '10px',
              display: 'inline-block',
              marginRight: '10px',
            }}
          ></div>
          <span className="key-word">{word}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorKey;