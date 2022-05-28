import React, { FC, useState, useEffect } from 'react';
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const clickCell = (cell: Cell) => cell.figure && setSelectedCell(cell);
  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };
  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  useEffect(() => {
    highlightCells();
  }, [selectedCell])
  return (
    <div className='board'>
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              key={cell.id}
              selectedCell={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              cell={cell}
              clickCell={clickCell}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
