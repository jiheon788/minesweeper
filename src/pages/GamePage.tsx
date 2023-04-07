import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { clickCell, initMap } from '@/store/slices/gameSlice';

const GamePage = () => {
  const { gameMap } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initMap({ width: 18, height: 8 }));
  }, []);

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
                      className="button"
                      onClick={() => {
                        console.log(1);
                        dispatch(clickCell({ clickPos: [row, col] }));
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
  );
};

export default GamePage;
