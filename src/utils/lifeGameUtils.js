export function makeRandomAlive(percentage, tableSize) {
  const array = Array.from({ length: tableSize }, () =>
    Array(tableSize).fill(false)
  );
  const totalCells = array.length * array[0].length;
  const aliveCellsCount = Math.floor(totalCells * percentage * 0.01);
  let cellsToMakeAlive = aliveCellsCount;

  while (cellsToMakeAlive > 0) {
    const randomRow = Math.floor(Math.random() * array.length);
    const randomCol = Math.floor(Math.random() * array[0].length);

    if (!array[randomRow][randomCol]) {
      array[randomRow][randomCol] = true;
      cellsToMakeAlive--;
    }
  }

  return [array, aliveCellsCount];
}

export function getNextCellsArray(array) {
  const newArray = array.map((row, rowIndex) =>
    row.map((isAlive, colIndex) => {
      const tempAroundCells = [
        array[rowIndex + 1]?.[colIndex],
        array[rowIndex - 1]?.[colIndex],
        array[rowIndex][colIndex + 1],
        array[rowIndex][colIndex - 1],
        array[rowIndex + 1]?.[colIndex + 1],
        array[rowIndex - 1]?.[colIndex + 1],
        array[rowIndex + 1]?.[colIndex - 1],
        array[rowIndex - 1]?.[colIndex - 1],
      ];
      const aroundCells = tempAroundCells.map((e) => (e === undefined ? false: e));
      const count = aroundCells.filter(e => e === true).length;

      if(count === 3 && !isAlive){
        return true;
      } else if ((count === 2 && isAlive) || count === 3) {
        return isAlive;
      } else {
        return false;
      }
    })
  );
  return newArray;
}