import { useAppDispatch, useAppSelector } from '@/store';
import { clickCell, flagCell, startGame } from '@/store/slices/gameSlice';
import { ModeMeta } from '@/meta/GameMeta';
import Cell from '@/components/Cell';
import useQueryString from '@/hooks/useQueryString';

const GameTable = () => {
  const { getParams } = useQueryString();
  const { gameMap, gameStatus } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();

  const onLeftClick = (row: number, col: number) => {
    if (gameStatus === 'READY') {
      const mode = getParams('mode');
      dispatch(
        startGame({
          clickedXPos: row,
          clickedYPos: col,
          mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0],
        }),
      );
    }
    dispatch(clickCell({ clickedXPos: row, clickedYPos: col }));
  };

  const onRightClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: number, col: number) => {
    e.preventDefault();
    dispatch(flagCell({ clickedXPos: row, clickedYPos: col }));
  };

  return (
    <table>
      <tbody>
        {gameMap.map((cells, row) => {
          return (
            <tr key={row}>
              {cells.map((cell, col) => {
                return (
                  <td key={`${row}x${col}`}>
                    <button
                      type="button"
                      className={`cell-button ${cell.isOpen ? 'is-opened' : ''}`}
                      onClick={() => onLeftClick(row, col)}
                      onContextMenu={(e) => onRightClick(e, row, col)}
                    >
                      {cell.isOpen && <Cell value={cell.value} />}
                    </button>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GameTable;
