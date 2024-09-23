import React, { useState } from "react";
import { SketchPicker } from "react-color";

function ColorPalette({ changeColor, isAlive, color }) {
  const [showPalette, setShowPalette] = useState(false);

  return (
    <div style={{position: "relative", marginLeft: "2px", marginTop: "2px"}}>
      <div
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: color,
          border: "1px solid #000",
          cursor: "pointer",
        }}
        onClick={() => setShowPalette(!showPalette)}
      ></div>

      {showPalette && (
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.3)"
            }}
            onClick={() => setShowPalette(false)}
          />
          <SketchPicker
            color={color}
            onChange={(e) => changeColor(isAlive, e.hex)}
          />
        </div>
      )}
    </div>
  );
}

export default ColorPalette;
