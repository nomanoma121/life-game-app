import React from "react";

function Cell({ isAlive }) {
  return (
    <div
      style={{
        width: "15px",
        height: "15px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isAlive ? "green": "white",
      }}
    >
      {isAlive}
    </div>
  );
}

export default Cell;
