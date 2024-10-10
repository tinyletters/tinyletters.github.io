import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigation hook

const ColorKey = ({ bubbleData, colorMap }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const sortedWords = bubbleData.sort((a, b) => b.value - a.value);

  const handleWordClick = (word) => {
    // Navigate to the word's sentences page
    navigate(`/sentences/${word}`);
  };

  return (
    <div className="color-key">
      {sortedWords.map((bubble) => (
        <div
          key={bubble.name}
          className="color-key-item"
          onClick={() => handleWordClick(bubble.name)} // Add the click handler
          style={{ cursor: 'pointer' }} // Add a pointer cursor to show it's clickable
        >
          <div
            className="color-box"
            style={{
              fontSize: '10px',
              backgroundColor: colorMap[bubble.name] || '#8884d8',
              width: '40px',
              height: '10px',
              display: 'inline-block',
              marginRight: '10px',
            }}
          ></div>
          <span className="key-word">{bubble.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ColorKey;
