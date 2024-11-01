import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export default function Colophon() {
  const navigate = useNavigate();
  return (
    <>
      <div className="colophon-title">
        <h3>colophon</h3>
      </div>
      <div className="colophon">
        <div className="colophon-1">
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          />
          <h4>Background</h4>
          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <p>
            Tiny letters for mothers is a non-commercial, artistic research
            project that aims to create a global network of data stories about
            mothering and parenting, especially in the early stages. The first
            data story in tiny letters for mothers, which anyone anywhere in the
            world can contribute to, emphasises the process of recalling birth
            or coming home stories, exploring the way in which data and
            narrative can express the nuances of this unique period in a mother
            or parent’s life, which is often difficult to express. It is a
            collaborative project, primarily inspired by the work of Dee Marco
            around motherhood and community. After Dee worked with Independent
            Network for Contemporary Culture & Art (INCCA) on their Art After
            Baby project, her and INCCA founder Lara Koseff found common ground
            in their interest in trying to find new ways to tell the many little
            stories of motherhood that often go unrecorded or unsaid.
          </p>

          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <h4>Technology used</h4>
          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <p>
            This website was built by Lara Koseff, using JavaScript libraries
            React and D3.js, and is hosted on GitHub pages.{" "}
          </p>
          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <h4>Design, fonts and artwork</h4>
          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <p>
            The website was conceptualised collaboratively by Dee Marco and Lara
            Koseff, and designed in Adobe XD. Fonts include Inter and Crake.
            Featured artworks throughout the site are digital collages by Dee
            Marco.
          </p>
          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <h4>Support</h4>
          {/* <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              width: "99.5%",
            }}
          /> */}
          <p>
            This project contributed to INCCA's “pay it forward” imperative that
            formed part of their Presidential Employment Stimulus Programme
            (PESP 4) award from the National Arts Council South Africa (NAC) in
            2023 for their project, Art After Baby.{" "}
          </p>
          <br />
          <div className="support-logos">
            <img className="support-logo" src="../images/INCCA-logo.png" alt="" />
            <img className="support-logo" src="../images/NAC-Logo.png" alt="" />
            <img className="support-logo" src="../images/pesp-logo.png" alt="" />
            <img className="support-logo" src="../images/Sport-Arts-and-Culture-Logo.jpg" alt="" />
          </div>
          <br />
          <br />
          <button onClick={() => navigate("/")}>Back home</button>
          <br />
          <br />
        </div>
        <div className="colophon-2">
          <img className="colophon-image" src="../images/image3.jpeg" alt="" />
        </div>
      </div>
    </>
  );
}
