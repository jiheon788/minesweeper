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
    const width = Number(searchParams.get('w'));
    const height = Number(searchParams.get('h'));

    dispatch(initMap({ width, height }));
  }, [searchParams]);

  return (
    <>
      <div>
        <select
          onChange={(e) => {
            const MODE = e.target.value as keyof typeof ModeMeta;
            if (MODE === 'CUSTOM') return;
            searchParams.set('w', String(ModeMeta[MODE].width));
            searchParams.set('h', String(ModeMeta[MODE].height));
            searchParams.set('r', String(ModeMeta[MODE].ratio));
            setSearchParams(searchParams);
          }}
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
                          dispatch(clickCell({ clickXPos: row, clickYPos: col }));
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
