import { useState } from 'react';
import { getNumOfMine, isClicked, isMine } from '@/utils/gameHelper';

interface ICellProps {
  row: number;
  col: number;
  text: string | number;
  onClickCell: (row: number, col: number) => void;
}

const Cell = ({ row, col, text, onClickCell }: ICellProps) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <td key={`${row}x${col}`}>
      <button
        type="button"
        className="button"
        onClick={() => {
          if (!isClick) {
            onClickCell(row, col);
            setIsClick(true);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        {isClick && text}
      </button>
    </td>
  );
};

export default Cell;
