import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import { makeRandomAlive, getNextCellsArray } from "../utils/lifeGameUtils";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

function Table() {
  const tableSize = 50;
  const [percentage, setPercentage] = useState(25);
  const [step, setStep] = useState(0);
  const [alive, setAlive] = useState(0);
  const [simulating, setSimulating] = useState(false);
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
    setCellsArray(Array.from({ length: tableSize }, () => Array(tableSize).fill(false)));
    setStep(0);
    setAlive(0);
  }

  useEffect(() => {
    let intervalId;
    if (simulating) {
      intervalId = setInterval(() => {
        setCellsArray(prevCellsArray => {
          const nextCellsArray = getNextCellsArray(prevCellsArray);
          setStep(prevStep => prevStep + 1);
          setAlive(nextCellsArray.flat().filter(cell => cell).length);
          return nextCellsArray;
        });
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [simulating]);

  const handleSimulate = () => {
    setSimulating(prev => !prev);
  };

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
      >
        {cellsArray.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell isAlive={value} key={`${rowIndex}-${colIndex}`} />
          ))
        )}
      </div>
      <div>
        <Button onClick={handleSimulate}>{simulating ? "Stop" : "Simulate"}</Button>
        <Button onClick={generateInitialState}>Generate</Button>
        <Input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          inputProps={{ min: 0, max: 100 }}
          style={{ width: "45px" }}
        />
        <span>%</span>
        <Button onClick={() => clear()}>Clear</Button>
        <p>Step: {step} Alive: {alive} Dead: {tableSize * tableSize - alive}</p>
      </div>
    </>
  );
}

export default Table;
