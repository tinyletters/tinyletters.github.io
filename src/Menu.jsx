import React, { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

export default function Menu({ isOpen, toggleMenu }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <>
      <div className={`menu ${isOpen ? "menu--open" : ""}`}>
        <div className="menu-items">
          <div className="close-flex">
            <img src="../logo-white.svg" className="menu-logo" alt="logo" />
            <img
              src="../images/cross.svg"
              className="close-menu"
              alt="close"
              onClick={toggleMenu}
            />
          </div>
          <Divider
            sx={{
              borderColor: "white",
              borderWidth: "1px",
              width: "99.5%",
            }}
          />
          <div
            className="menu-item"
            onClick={() => handleNavigate("/data-stories")}
          >
            data stories
          </div>
          <Divider
            sx={{
              borderColor: "white",
              borderWidth: "1px",
              width: "99.5%",
            }}
          />
          <div
            className="menu-item"
            onClick={() => handleNavigate("/references")}
          >
            references
          </div>
          <Divider
            sx={{
              borderColor: "white",
              borderWidth: "1px",
              width: "99.5%",
            }}
          />
          <div className="menu-item" onClick={() => handleNavigate("/")}>
            home
          </div>
          <Divider
            sx={{
              borderColor: "white",
              borderWidth: "1px",
              width: "99.5%",
            }}
          />
<p>tinylettersformothers@gmail.com</p>
          
          {/* <div className="email-flex">
            <div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="contribute">
                  <div>contribute</div>
                  <img
                    className="write"
                    src="../images/write-simple.svg"
                    alt=""
                  />
                </button>
              </a>
            </div>
            <div>
              <a
                href="mailto:tinylettersformothers@gmail.com"
                className="home-button"
              >
                <img
                  src="../images/email-icon.svg"
                  className="email-menu"
                  alt="logo"
                />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
