import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { clickCell, initMap, startGame } from '@/store/slices/gameSlice';
import { CellStatus, GameStatus, ModeMeta } from '@/meta/GameMeta';
import { getNumOfMine, isClicked, isMine } from '@/utils/gameHelper';
import Cell from '@/components/Cell';

const GamePage = () => {
  const [isStart, setIsStart] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { gameMap, gameStatus } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mode = searchParams.get('mode');
    dispatch(initMap({ mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0] }));
    setIsStart(false);
  }, [searchParams, dispatch]);

  const onClickCell = (row: number, col: number) => {
    if (!isStart) {
      const mode = searchParams.get('mode');
      dispatch(
        startGame({
          clickedXPos: row,
          clickedYPos: col,
          mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0],
        }),
      );

      setIsStart(true);
    }

    dispatch(clickCell({ clickedXPos: row, clickedYPos: col }));
  };

  return (
    <>
      <div>
        <button>{GameStatus[gameStatus as keyof typeof GameStatus]}</button>
        <select
          onChange={(e) => {
            searchParams.set('mode', e.target.value.toLowerCase());
            setSearchParams(searchParams);
          }}
          defaultValue={Object.keys(ModeMeta)[0]}
        >
          {Object.keys(ModeMeta).map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>
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
                        className="button"
                        onClick={() => {
                          onClickCell(row, col);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {cell.isOpen && <Cell row={row} col={col} />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <h1>Test</h1>
      <table>
        <tbody>
          {gameMap.map((cells, row) => {
            return (
              <tr key={row}>
                {cells.map((cell, col) => {
                  return (
                    <td key={`${row}x${col}`}>
                      <button type="button" className="button">
                        {cell.status}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GamePage;
