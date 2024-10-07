import React from 'react';
import colorMap from './ColorMap'; 

const ColorKeyStory = ({ bubbleData, colorMap }) => {

    const sortedWords = bubbleData
      .sort((a, b) => b.value - a.value); 
  
    return (
      <div className="color-key-story">
        {sortedWords.map((bubble) => (
          <div
            key={bubble.name}
            className="color-key-item"
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
