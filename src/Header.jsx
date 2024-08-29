import * as React from "react";
import "./App.css";
import { Divider } from "@mui/material";

export default function Header() {
  return (
    <>
<br />
<br />

<div className="div-mobile">
      <Divider
        sx={{
          borderColor: "black",
          borderWidth: "0.99px",
          width: "99.5%",
        }}
      />
      </div>

<div className="div-dt">
      <Divider
        sx={{
          borderColor: "black",
      borderWidth: "1px",
          width: "100%",
        }}
      />
      </div>
      <div className="header--box">
        <div className="header--title">tiny letters for parents</div>
        <img src="../images/logo.svg" className="header--logo" alt="logo" />
      </div>
      <div className="div-mobile">
      <Divider
        sx={{
          borderColor: "black",
          borderWidth: "0.99px",
          my: 1,
          width: "99.5%",
        }}
      />
      </div>
      <div className="div-dt">
      <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              my: 2,
              width: "100%",
            }}
          />
          </div>
    </>
  );
}
