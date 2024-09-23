import React from "react";

function Cell({ isAlive, rowIndex, colIndex, changeCell, isDragging }) {
  const handleMouseOver = () => {
    if (isDragging) {
      changeCell(rowIndex, colIndex);
    }
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      style={{
        width: "15px",
        height: "15px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isAlive ? "green" : "white",
      }}
    ></div>
  );
}

export default Cell;
