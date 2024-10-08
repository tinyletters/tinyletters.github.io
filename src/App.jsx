import { useState } from "react";
import "./App.css";
import { Circles } from "./Circle";
import Header from "./Header";
import { Divider } from "@mui/material";
import References from "./References";
import BubbleChartComponent from "./BubbleChartComponent";
import FullStoryPage from './FullStoryPage';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop'; 
import WordSentencesPage from './WordSentencesPage'; 

function MainContent() {
  const location = useLocation();
  const isStoryPage = location.pathname.includes('/story');
  const isWordSentencesPage = location.pathname.includes('/sentences');

  return (
    <>
      {isStoryPage ? (
        <Routes>
          <Route path="/story/:id" element={<FullStoryPage />} />
        </Routes>
      ) : isWordSentencesPage ? (
        <Routes>
          <Route path="/sentences/:word" element={<WordSentencesPage />} />
        </Routes>
      ) : (
        <>
          <div className="circles--mobile">
            <br />
            <br />
            <Circles />
          </div>
          <br />
          <div className="circles--dt">
            <Circles />
          </div>
          <div className="intro--card">
            <div className="about">
              <h2>about</h2>
              <Divider
                sx={{
                  borderColor: "black",
                  borderWidth: "1px",
                  my: 2,
                  width: "100%",
                }}
              />
              <p>
                To contribute your birth or coming home story{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  fill out this form
                </a>
              </p>
              <Divider
                sx={{
                  borderColor: "black",
                  borderWidth: "1px",
                  my: 2,
                  width: "100%",
                }}
              />
            </div>
            <div className="card">
              <p>
                Tiny letters for mothers is an artistic research project that aims
                to create a global network of data stories about mothering and
                parenting, especially in the early stages. Our first data story is
                focused on the first 40 days / 6 weeks postpartum, and on the birth
                stories of mothers or coming home stories in the context of
                adoption. The title tiny letters is borne of Dee Marco’s 40+day
                postpartum writing after the birth of her third child in 2023. Her
                candid and sometimes raw and scary recollections of the time set off
                a series of conversations that led to the best kind of working
                collaboration – one where mums work together. Dee and creative
                developer Lara Koseff embark on this journey of learning about
                global experiences of mothers and parents by creating a data story
                through tiny letters from one mum to another, from one geography to
                another, from one illogical moment to another.
              </p>
            </div>
          </div>

          <div className="section--div">
            <Divider
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                my: 2,
                width: "100%",
              }}
            />
          </div>
          <Routes>
            <Route path="/" element={<BubbleChartComponent />} />
          </Routes>
          <br />
          <div className="section--div">
            <Divider
              sx={{
                borderColor: "black",
                borderWidth: "1px",
                my: 2,
                width: "100%",
              }}
            />
          </div>
          <References />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Header />
      <MainContent />
    </Router>
  );
}

export default App;
