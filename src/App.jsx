import { useState } from "react";
import "./App.css";
import { Circles } from "./Circle";
import Header from "./Header";
import { Divider } from "@mui/material";
import References from "./References";
import BubbleChartComponent from "./BubbleChartComponent"

function App() {

  const sampleText = "Hello world! This is a test. Hello again, world! This text is just a simple test.";

  return (
    <>
      <Header />
      <div className="circles--mobile" >
      <br />
      <br />
      <Circles />
      </div>
      <br />
      <div>

        </div>
      <div className="intro--card">
        <div className="about">
          <h2>about</h2>
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.9px",
              my: 2,
              width: "100%",
            }}
          />
          <p>
            To contribute your birth or coming home story{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform"
              target="_blank"
            >
              fill out this form
            </a>
          </p>
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "0.9px",
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
            focussed on the first 40 days / 6 weeks postpartum, and on the birth
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
      <div className="circles--dt">
        <Circles  />
      </div>
      <div className="section--div">
        <Divider
          sx={{
            borderColor: "black",
            borderWidth: "0.9px",
            my: 2,
            width: "100%",
          }}
        />
      </div>
      <br />
      <BubbleChartComponent className text={sampleText} />
      <br />

      <div className="section--div">
        <Divider
          sx={{
            borderColor: "black",
            borderWidth: "0.9px",
            my: 2,
            width: "100%",
          }}
        />
      </div>
      <References />
    </>
  );
}

export default App;
