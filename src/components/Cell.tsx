interface ICellProps {
  value: number;
}

const Cell = ({ value }: ICellProps) => {
  switch (value) {
    case -2:
      return <>💣</>;
    case 0:
      return <></>;
    default:
      return <>{value}</>;
  }
};

export default Cell;
