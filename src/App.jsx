import { useState } from "react";
import "./App.css";
import { Circles } from "./Circle";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <div className="intro--card">
        <div className="about">
          <h2>about</h2>
          <p>
            To contribute to our first data story{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform" target="_blank">
              fill out this form
            </a>
          </p>
        </div>
        <div className="card">
          <p>
            Tiny letters for mothers is an artistic research project that aims
            to create a global network of data stories about the first 40 days /
            6 weeks postpartum. The title tiny letters is borne of Dee Marco’s
            40+day postpartum writing after the birth of her third child in
            2023. Her candid and sometimes raw and scary recollections of the
            time set off a series of conversations that led to the best kind of
            working collaboration – one where mums work together. Dee and
            creative developer Lara Koseff embark on this journey of learning
            about global experiences of mothers by creating a data story through
            tiny letters from one mum to another, from one geography to another,
            from one illogical moment to another.
          </p>
        </div>
      </div>
      <div>
        <Circles />
      </div>
    </>
  );
}

export default App;
