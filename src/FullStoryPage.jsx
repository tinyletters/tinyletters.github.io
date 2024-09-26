import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./Data";
import { Divider } from "@mui/material";

function FullStoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const story = data.find((item) => item.id === id);
  const birthParagraphs = story.birthOnly
    .split("\n")
    .filter((p) => p.trim() !== ""); // Remove empty lines
  const firstFortyParagraphs = story.firstFortyDays
    .split("\n")
    .filter((p) => p.trim() !== ""); // Remove empty lines

  if (!story) {
    return <p>Story not found</p>;
  }

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
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.99px",
              my: 1,
              width: "100%",
            }}
          />
          <h3 className="story-name">
            {story.name}, {story.countryLivesIn}
          </h3>
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.99px",
              my: 1,
              width: "100%",
            }}
          />
          <br />
          <div>
            <strong>Year of birth:</strong> {story.birthDate}
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
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.99px",
              my: 1,
              width: "100%",
            }}
          />
          <br />

          {/* Back Button */}
          <button onClick={() => navigate("/")}>Back home</button>
        </div>
        <div className="birth-story">
          <h4>birth story</h4>
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.99px",
              my: 1,
              width: "100%",
            }}
          />
          <br />
          {birthParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
          <br />

          <h4>the first 40 days (and other memories)</h4>
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.99px",
              my: 1,
              width: "100%",
            }}
          />
          <br />
          {firstFortyParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default FullStoryPage;
