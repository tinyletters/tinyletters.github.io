import React from "react";
import "./App.css";
import { Circles } from "./Circle";
import { Divider } from "@mui/material";
import References from "./References";
import BubbleChartComponent from "./BubbleChartComponent";
import FullStoryPage from "./FullStoryPage";
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import WordSentencesPage from "./WordSentencesPage";
import Colophon from "./Colophon";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isStoryPage = location.pathname.includes("/story");
  const isWordSentencesPage = location.pathname.includes("/sentences");
  const isColophon = location.pathname.includes("/colophon");
  const isDataStory = location.pathname.includes("/data-stories");
  const isReferences = location.pathname.includes("/references");

  return (
    <>
      <div className="main-content">
        {isStoryPage ? (
          <Routes>
            <Route path="/story/:id" element={<FullStoryPage />} />
          </Routes>
        ) : isWordSentencesPage ? (
          <Routes>
            <Route path="/sentences/:word" element={<WordSentencesPage />} />
          </Routes>
        ) : isColophon ? (
          <Routes>
            <Route path="/colophon" element={<Colophon />} />
          </Routes>
        ) : isDataStory ? (
          <Routes>
            <Route path="/data-stories" element={<BubbleChartComponent />} />
          </Routes>
        ) : isReferences ? (
          <Routes>
            <Route path="/references" element={<References />} />
          </Routes>
        ) : (
          <>
            <div className="circles--mobile">
              <br />
              <br />
              <Circles />
            </div>
            <br />
            <div className="circle-intro">
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
                    View our first data story{" "}
                    <span
                      className="here"
                      onClick={() => navigate("/data-stories")}
                    >
                      here
                    </span>
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
                    Tiny letters for mothers is an artistic research project
                    that aims to create a global network of data stories about
                    mothering and parenting, especially in the early stages. Our
                    first data story is focused on the first 40 days / 6 weeks
                    postpartum, and on the birth stories of mothers or coming
                    home stories in the context of adoption. The title tiny
                    letters is borne of Dee Marco’s 40+day postpartum writing
                    after the birth of her third child in 2023. Her candid and
                    sometimes raw and scary recollections of the time set off a
                    series of conversations that led to the best kind of working
                    collaboration – one where mums work together. Dee and
                    creative developer Lara Koseff embark on this journey of
                    learning about global experiences of mothers and parents by
                    creating a data story through tiny letters from one mum to
                    another, from one geography to another, from one illogical
                    moment to another. To contribute and access our form, scan
                    the QR code on this page. To get in touch, email us:
                    tinylettersformothers@gmail.com
                  </p>
                </div>
              </div>
              <div className="qr--card">
              <Divider
                    sx={{
                      borderColor: "black",
                      borderWidth: "1px",
                      my: 2,
                      width: "100%",
                    }}
                  />
                <p>
                  To contribute your birth or coming home story, scan this code:
                </p>
                <br />
                <img
                  src="../images/Tiny_Letters_Poster.jpeg"
                  alt="qr-code"
                  className="qr-code"
                />
                
              </div>
              <br />

              <br />
              <br />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MainContent;
