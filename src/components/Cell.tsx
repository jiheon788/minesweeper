import { CellStatus } from '@/meta/GameMeta';

interface ICellProps {
  value: number;
}

const Cell = ({ value }: ICellProps) => {
  switch (value) {
    case CellStatus.FLAG:
      return <>🚩</>;
    case CellStatus.MINE:
      return <>💣</>;
    case CellStatus.EMPTY:
      return <></>;
    default:
      return <>{value}</>;
  }
};

export default Cell;
