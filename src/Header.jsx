import * as React from "react";
import "./App.css";
import { Divider } from "@mui/material";

export default function Header() {
  return (
    <>
<br />
<br />
      <Divider
        sx={{
          borderColor: "black",
          borderWidth: "1px",
          width: "100%",
        }}
      />
      <div className="header--box">
        <div className="header--title">tiny letters for mothers</div>
        <img src="../images/logo.svg" className="header--logo" alt="logo" />
      </div>
      <Divider
            sx={{
              borderColor: "black",
              borderWidth: "1px",
              my: 2,
              width: "100%",
            }}
          />
    </>
  );
}
