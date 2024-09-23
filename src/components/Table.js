import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { makeRandomAlive, getNextCellsArray } from "../utils/lifeGameUtils";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import DrawIcon from "@mui/icons-material/Draw";
import BackspaceIcon from "@mui/icons-material/Backspace";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import { IconButton } from "@mui/material";
import ColorPalette from "./ColorPalette";

function Table({ props }) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const tableSize = 50;
  const [percentage, setPercentage] = useState(25);
  const [step, setStep] = useState(0);
  const [alive, setAlive] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [aliveColor, setAliveColor] = useState("black");
  const [deadColor, setDeadColor] = useState("white");
  const [cellsArray, setCellsArray] = useState(
    Array.from({ length: tableSize }, () => Array(tableSize).fill(false))
  );

  function generateInitialState() {
    setSimulating(false);
    setStep(0);
    const [newArray, aliveCellsCount] = makeRandomAlive(percentage, tableSize);
    setCellsArray(newArray);
    setAlive(aliveCellsCount);
  }

  function clear() {
    setSimulating(false);
    setCellsArray(
      Array.from({ length: tableSize }, () => Array(tableSize).fill(false))
    );
    setStep(0);
    setAlive(0);
  }

  function changeCell(row, col) {
    const newCellsArray = cellsArray.map((temp, rowIndex) =>
      temp.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          if (isWriteMode) {
            return true;
          } else if (isDeleteMode) {
            return false;
          } else {
            return cell;
          }
        }
        return cell;
      })
    );
    setCellsArray(newCellsArray);
    setAlive(newCellsArray.flat().filter((cell) => cell).length);
  }

  useEffect(() => {
    let intervalId;
    if (simulating) {
      intervalId = setInterval(() => {
        setCellsArray((prevCellsArray) => {
          const nextCellsArray = getNextCellsArray(prevCellsArray);
          setStep((prevStep) => prevStep + 1);
          setAlive(nextCellsArray.flat().filter((cell) => cell).length);
          return nextCellsArray;
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [simulating]);

  const handleSimulate = () => {
    setSimulating((prev) => !prev);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWriteClick = () => {
    setIsWriteMode(!isWriteMode);
    setIsDeleteMode(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteMode(!isDeleteMode);
    setIsWriteMode(false);
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    setCellsArray(props);
  }, [props]);

  function changeColor(isAlive, color) {
    if(isAlive){
      setAliveColor(color);
    } else {
      setDeadColor(color);
    }
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${tableSize}, 1fr)`,
          gridGap: "0px",
          width: `${tableSize * 15}px`,
          height: `${tableSize * 15}px`,
          marginBottom: "120px",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {cellsArray.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              isAlive={value}
              rowIndex={rowIndex}
              colIndex={colIndex}
              changeCell={changeCell}
              isDragging={isDragging}
              aliveColor={aliveColor}
              deadColor={deadColor}
              key={`${rowIndex}-${colIndex}`}
            />
          ))
        )}
      </div>
      <div style={{ display: "flex", height: "25px", marginLeft: "50px" }}>
        <Button onClick={handleSimulate}>
          {simulating ? "Stop" : "Simulate"}
        </Button>
        <Button onClick={generateInitialState}>Generate</Button>
        <Input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          inputProps={{ min: 0, max: 100 }}
          style={{ width: "45px" }}
        />
        <div>%</div>
        <Button onClick={() => clear()}>Clear</Button>
        <div style={{display: "flex"}}>
          Step: {step} Alive<ColorPalette changeColor={changeColor} isAlive={true} color={aliveColor}/>: {alive} Dead<ColorPalette changeColor={changeColor} isAlive={false} color={deadColor}/>: {tableSize * tableSize - alive}
        </div>
        <IconButton onClick={handleWriteClick} style={{ marginLeft: "30px" }}>
          {isWriteMode ? <DrawIcon /> : <DrawOutlinedIcon />}
        </IconButton>
        <IconButton onClick={handleDeleteClick}>
          {isDeleteMode ? <BackspaceIcon /> : <BackspaceOutlinedIcon />}
        </IconButton>
      </div>
    </>
  );
}

export default Table;
