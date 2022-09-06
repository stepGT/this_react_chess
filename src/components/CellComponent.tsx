import { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell;
  selectedCell: boolean;
  clickCell: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selectedCell, clickCell }) => {
  return (
    <div
      onClick={() => clickCell(cell)}
      className={['cell', cell.color, selectedCell ? 'selected' : ''].join(' ')}
      style={{ background: cell.available && cell.figure ? 'green' : '' }}>
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};

export default CellComponent;
