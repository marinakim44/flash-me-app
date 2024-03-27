import React from "react";

export default function Search() {
  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <input
        style={{
          padding: "5px",
          borderRadius: "5px",
          border: "none",
          width: "100%",
          maxWidth: "500px",
        }}
        placeholder="Search..."
      />
    </div>
  );
}
