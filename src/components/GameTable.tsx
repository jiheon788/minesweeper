import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { clickCell, endGame, flagCell, startGame } from '@/store/slices/gameSlice';
import Cell from '@/components/Cell';

const GameTable = () => {
  const { gameMap, gameStatus } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();

  const onLeftClick = (row: number, col: number) => {
    if (gameStatus === 'READY') {
      dispatch(
        startGame({
          clickedXPos: row,
          clickedYPos: col,
        }),
      );
    }
    dispatch(clickCell({ clickedXPos: row, clickedYPos: col }));
  };

  useEffect(() => {
    let countOfOpenedCell = 0;
    gameMap.forEach((cells) => {
      cells.forEach((cell) => {
        if (cell.isOpen) countOfOpenedCell += 1;
      });
    });

    if (countOfOpenedCell === gameMap.length * gameMap[0].length && gameStatus === 'PROGRESS') {
      dispatch(endGame());
    }
  }, [gameMap]);

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
