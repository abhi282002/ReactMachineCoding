import React, { useCallback, useState } from "react";

interface SelectableGridProps {
  rows: number;
  columns: number;
}

const SelectableGrid = ({ rows, columns }: SelectableGridProps) => {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [isSelectedStart, setIsSelectedStart] = useState<boolean>(false);

  const handleMouseDown = (cell: number) => {
    setIsSelectedStart(true);
    setSelectedCells([cell]);
  };

  const handleMouseEnter = useCallback(
    (cell: number) => {
      if (isSelectedStart) {
        const startValue = selectedCells[0];
        const endValue = cell;

        const startRow = Math.floor((startValue - 1) / columns);
        const startColumn = (startValue - 1) % columns;
        const endRow = Math.floor((endValue - 1) / columns);
        const endColumn = (endValue - 1) % columns;

        const minRow = Math.min(startRow, endRow);
        const maxRow = Math.max(startRow, endRow);
        const minCol = Math.min(startColumn, endColumn);
        const maxCol = Math.max(startColumn, endColumn);

        const selected: number[] = [];
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * columns + col + 1);
          }
        }
        setSelectedCells(selected);
        console.log(selected);
      }
    },
    [isSelectedStart]
  );

  const handleMouseUp = () => {
    setIsSelectedStart(false);
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns},35px)`,
        gridTemplateRows: `repeat(${rows},35px)`,
        userSelect: "none",
      }}
    >
      {[...Array(rows * columns).keys()].map((_, i) => (
        <div
          key={i}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          style={{
            width: "35px",
            height: "35px",
            border: "1px solid gray",
            display: "flex",
            justifyContent: "center",
            backgroundColor: `${
              selectedCells.includes(i + 1) ? "lightblue" : ""
            }`,
          }}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
