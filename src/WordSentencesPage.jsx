import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./Data";
import colorMap from "./ColorMap";
import { Divider } from "@mui/material";

function WordSentencesPage() {
  const { word } = useParams();
  const [sentences, setSentences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const normalizedWord = word.trim().toLowerCase();

    const matchingSentences = [];

    data.forEach((item) => {
      const filteredSentences = item.sentences.filter((sentence) =>
        new RegExp(`\\b${normalizedWord}\\b`, "i").test(sentence)
      );
      if (filteredSentences.length > 0) {
        matchingSentences.push({ item, filteredSentences });
      }
    });
    setSentences(matchingSentences);
  }, [word]);

  if (sentences.length === 0) {
    return <div>No sentences available for this word.</div>;
  }

  return (
    <div>
      <div className="word-intro">
        <div className="word-header">
          <div className="dot-and-word">
            <div
              className="word-dot"
              style={{
                borderRadius: "50%",
                backgroundColor: colorMap[word] || "gray",
                width: "6vw",
                height: "6vw",
              }}
            />
            <div className="word-word">{word}</div>
          </div>
          <div className="all-mentions">
            <Divider
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                my: 1,
                width: "100%",
              }}
            />
            <p>All mentions of the associated word </p>
            <Divider
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                my: 1,
                width: "100%",
              }}
            />
          </div>
        </div>
        <br />
        <br />
        <button onClick={() => navigate("/")}>Back home</button>
      </div>

      <div className="word-flex">
        {sentences.map(({ item, filteredSentences }, index) => (
          <div key={index} className="word-container">
            <Divider
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                my: 1,
                width: "100%",
              }}
            />
            <div className="word-name-flex">
              <div>
                <img
                  src={item.portrait}
                  className="word-portrait"
                  alt="portrait"
                />
              </div>
              <div>
                <strong>{item.motherName}</strong>, {item.countryLivesIn}
              </div>
            </div>
            <Divider
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                my: 1,
                width: "100%",
              }}
            />
            {filteredSentences.map((sentence, sentenceIndex) => {
              const boldedSentence = sentence.replace(
                new RegExp(`(${word})`, "gi"),
                "<strong>$1</strong>"
              );

              return (
                <div key={sentenceIndex}>
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: boldedSentence }} />
                  <br />
                  <Divider
                    sx={{
                      borderColor: "black",
                      borderWidth: "1px",
                      my: 1,
                      width: "100%",
                    }}
                  />
                </div>
              );
            })}
            <br />
            Read full birth story{" "}
            <strong>
              <a href={`#/story/${item.id}`}>here</a>
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordSentencesPage;
