import React from "react";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#EE4266",
        alignItems: "center",
        padding: "5px 30px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          margin: 0,
        }}
      >
        Flash Me App
      </h1>
      <div style={{ color: "white" }}>
        <p style={{ margin: 0, textAlign: "left" }}>FREE</p>
        <p style={{ margin: 0, textAlign: "left" }}>until 31 May 2024</p>
      </div>
    </div>
  );
}
