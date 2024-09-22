import React from 'react'

function Table() {
  const [tableArray, setTableArray] = useState(Array.from({ length: 30}, () => Array(30).fill(0)));
  const [tableSize, setTableSize] = useState(30);
  return (
    <div className="table">
      {tableArray.map((row, rowIndex) => (
        row.map((value, colIndex) => (
          <div></div>
        ))
      ))}
    </div>
  )
}

export default Table