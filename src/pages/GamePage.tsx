import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { clickCell, initMap } from '@/store/slices/gameSlice';
import { ModeMeta } from '@/meta/GameMeta';

const GamePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { gameMap } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const mode = searchParams.get('mode');
    dispatch(initMap({ mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0] }));
  }, [searchParams, dispatch]);

  return (
    <>
      <div>
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
                          const mode = searchParams.get('mode');

                          dispatch(
                            clickCell({
                              clickXPos: row,
                              clickYPos: col,
                              mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0],
                            }),
                          );
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                        }}
                      >
                        {cell}
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
