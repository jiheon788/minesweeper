import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { getNumOfMine, isClicked, isMine } from '@/utils/gameHelper';

interface ICellProps {
  row: number;
  col: number;
}

const Cell = ({ row, col }: ICellProps) => {
  const { status, value } = useAppSelector((state) => state.gameData.gameMap[row][col]);

  switch (status) {
    case 0:
      return <>{value}</>;
    case 1:
      return <>💣</>;
    case 2:
    case 3:
      return <>🚩</>;
    default:
      return <></>;
  }
};

export default Cell;
