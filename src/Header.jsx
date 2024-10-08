import * as React from "react";
import "./App.css";
import { Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  return (
    <>
<br />
<br />

<div className="div-mobile">
      <Divider
        sx={{
          borderColor: "black",
          borderWidth: "1px",
          width: "99%",
        }}
      />
      </div>

<div className="div-dt">
      <Divider
        sx={{
          borderColor: "black",
      borderWidth: "1px",
          width: "100%",
          mb: 1, // Margin-bottom
        }}
      />
      </div>
      <div className="header-scroll">
      <div className="header--box">
        <div className="header--title">tiny letters for mothers</div>
       <button onClick={() => navigate("/")} className="home-button"><img src="../images/logo.svg"  className="header--logo" alt="logo" /></button> 
      </div>
      <div className="div-mobile">
      <Divider
        sx={{
          borderColor: "black",
          borderWidth: "1px",
          mt: 1,
          width: "99%",
        }}
      />
      </div>
      <div className="div-dt">
      <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              mt: 2, // Margin-top
              width: "100%",
            }}
          />
          </div>
          </div>
    </>
  );
}
