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
            <p>
             Mentions of this word in the stories we've received so far.
            </p>
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
        <div className="back-flex-word">
          <button onClick={() => navigate("/data-stories")}>
            Back to data story
          </button>
          {/* <button onClick={() => navigate("/")}>Back home</button> */}
        </div>
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
                marginTop: "-10px",
              }}
            />
            <div className="word-name-flex">
              <div>
                <a href={`#/story/${item.id}`}>
                  <img
                    src={item.portrait}
                    className="word-portrait"
                    alt="portrait"
                  />
                </a>
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

            <div>
              {filteredSentences.map((sentence, sentenceIndex) => {
                const boldedSentence = sentence.replace(
                  new RegExp(`(${word})`, "gi"),
                  "<strong>$1</strong>"
                );

                return (
                  <div key={sentenceIndex}>
                    <div className="word-name-flex-2">
                      <div>
                        <a href={`#/story/${item.id}`}>
                          <img
                            src={item.portrait}
                            className="word-portrait"
                            alt="portrait"
                          />
                        </a>
                      </div>
                      <br />
                      <div
                        dangerouslySetInnerHTML={{ __html: boldedSentence }}
                      />
                      <br />
                    </div>
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
            </div>
            <div className="word-name-flex">
              <div>
                <a href={`#/story/${item.id}`}>
                  <img
                    src={item.portrait}
                    className="word-portrait"
                    alt="portrait"
                  />
                </a>
              </div>
              <div>
                Read full birth story{" "}
                <strong>
                  <a href={`#/story/${item.id}`}>here</a>
                </strong>
              </div>
            </div>
          </div>
        ))}
        <div className="read-full-story">
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              my: 1,
              width: "100%",
              marginTop: "0.2rem",
              marginLeft: "0.5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WordSentencesPage;
