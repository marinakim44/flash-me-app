import React from "react";

export default function Logo() {
  return (
    <div>
      <img
        alt="logo"
        src={require("../common/images/logo.png")}
        style={{ height: "70px" }}
      />
    </div>
  );
}
