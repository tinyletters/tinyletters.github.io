import * as React from "react";
import { useState } from "react";
import "./App.css";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="top-section">
        {" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="contribute">
            <div>contribute your story</div>
            <img className="write" src="../images/write-simple.svg" alt="" />
          </button>
        </a>
      </div>
      <div className="div-mobile">
        <Divider
          sx={{
            borderColor: "black",
            borderWidth: "1px",
            width: "99.5%",
          }}
        />
      </div>

      <div className="div-dt">
        <Divider
          sx={{
            borderColor: "black",
            borderWidth: "1px",
            width: "99.8%",
            mb: 1,
          }}
        />
      </div>
      <div className="header-scroll">
        <div className="header--box">
          <div className="logo-header">
            <button onClick={() => navigate("/")} className="home-button">
              <img
                src="../images/logo.svg"
                className="header--logo"
                alt="logo"
              />
              <div className="header--title">tiny letters for mothers</div>
            </button>
          </div>
          <img
            src="../images/mobile-menu.svg"
            className="mobile-menu"
            alt="logo"
            onClick={toggleMenu}
          />
        </div>
        <div className="div-mobile">
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              mt: 1,
              width: "99.5%",
            }}
          />
        </div>
        <div className="div-dt">
          <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              mt: 2,
              width: "99.8%",
            }}
          />
        </div>
      </div>
      <Menu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
}
