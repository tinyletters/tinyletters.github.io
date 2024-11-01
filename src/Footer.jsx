import * as React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Colophon from "./Colophon";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer-scroll">
        <div className="footer--box">
          <div className="footer--title" onClick={() => navigate("/colophon")}>
            colophon
          </div>
          <div className="contribute-footer">
            {" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdF396c_2UL8Z_zjiszvVsEdRb5QHnJxeEhrVlxpgoEiidNig/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="contribute">
                <div>contribute your story</div>
                <img
                  className="write"
                  src="../images/write-simple.svg"
                  alt=""
                />
              </button>
            </a>
            <a
              href="mailto:tinylettersformothers@gmail.com"
              className="home-button"
            >
              <img
                src="../images/email-icon.svg"
                className="footer--logo"
                alt="logo"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
