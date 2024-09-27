import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ColorKey from "./ColorKey";
import data from "./Data";
import colorMap from './ColorMap'; 
import stopWords from "./StopWords";
import { Divider } from "@mui/material";

const normalizeWord = (word) => {
  if (word.endsWith("s") && word.length > 1) {
    return word.slice(0, -1);
  }
  return word;
};

const countWords = (text) => {
  const words = text.toLowerCase().split(/\s+/);
  const frequency = {};

  words.forEach((word) => {
    const normalizedWord = normalizeWord(word);
    if (!stopWords.has(normalizedWord)) {
      frequency[normalizedWord] = (frequency[normalizedWord] || 0) + 1;
    }
  });

  return frequency;
};

function FullStoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wordFrequency, setWordFrequency] = useState({});

  const story = data.find((item) => item.id === id);
  const birthParagraphs = story.birthOnly
    .split("\n")
    .filter((p) => p.trim() !== "");
  const firstFortyParagraphs = story.firstFortyDays
    .split("\n")
    .filter((p) => p.trim() !== "");

  if (!story) {
    return <p>Story not found</p>;
  }

  useEffect(() => {
    const frequency = countWords(story.birthStory);
    setWordFrequency(frequency);
  }, [story]);

  return (
    <>
      <div className="full-story-page">
        <div className="full-story-intro">
          <img
            src={story.portrait}
            alt={`${story.name}'s portrait`}
            className="full-story-portrait"
          />
          <br />
          <br />
          <Divider sx={{ borderColor: "black", borderWidth: "0.99px", my: 1, width: "100%" }} />
          <h3 className="story-name">
            {story.name}, {story.countryLivesIn}
          </h3>
          <Divider sx={{ borderColor: "black", borderWidth: "0.99px", my: 1, width: "100%" }} />
          <br />
          <div>
            <strong>Year of childbirth:</strong> {story.birthDate}
          </div>
          <div>
            <strong>Mother's age at childbirth:</strong> {story.birthAge}
          </div>
          <div>
            <strong>Mother's race:</strong> {story.race}
          </div>
          <div>
            <strong>City of child's birth:</strong> {story.city}
          </div>
          <div>
            <strong>Country of child's birth:</strong> {story.country}
          </div>
          <div>
            <strong>Number of child:</strong> {story.noOfChild}
          </div>
          <div>
            <strong>Birth type:</strong> {story.birthKind}
          </div>
          <br />
          <Divider sx={{ borderColor: "black", borderWidth: "0.99px", my: 1, width: "100%" }} />
          <br />

          {/* Back Button */}
          <button onClick={() => navigate("/")}>Back home</button>
        </div>
        <div className="birth-story">
          <h4>birth story</h4>
          <Divider sx={{ borderColor: "black", borderWidth: "0.99px", my: 1, width: "100%" }} />
          <br />
          {birthParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          <br />

          <h4>the first 40 days (and other memories)</h4>
          <Divider sx={{ borderColor: "black", borderWidth: "0.99px", my: 1, width: "100%" }} />
          <br />
          {firstFortyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
        <div>
          <ColorKey wordFrequency={wordFrequency} colorMap={colorMap} />
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default FullStoryPage;
