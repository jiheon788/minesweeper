import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { clickCell, initMap, startGame } from '@/store/slices/gameSlice';
import { CellStatus, GameStatus, ModeMeta } from '@/meta/GameMeta';
import Cell from '@/components/Cell';

const GamePage = () => {
  const [time, setTime] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { gameMap, gameStatus } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (gameStatus === 'PROGRESS') {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time, gameStatus]);

  const onInit = () => {
    const mode = searchParams.get('mode');
    dispatch(initMap({ mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0] }));
    setIsStart(false);
  };

  useEffect(() => {
    onInit();
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
      <div className="game-status">
        <div className="timer">{time}</div>
        <button type="button" className="button" onClick={onInit}>
          {GameStatus[gameStatus as keyof typeof GameStatus]}
        </button>

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
                        className={`cell-button ${cell.isOpen ? 'is-opened' : ''}`}
                        onClick={() => {
                          onClickCell(row, col);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                        }}
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
    </>
  );
};

export default GamePage;
