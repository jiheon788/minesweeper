import { useEffect, useState } from 'react';

const GamePage = () => {
  const generateGameMap = (w: number, h: number, m: number | null) => {
    return Array(h)
      .fill(0)
      .map(() => Array(w).fill(0));
  };

  const setRandomMine = (gameMap: boolean[][]) => {
    const isMine = Math.random() <= 0.1 ? 1 : 0;
  };

  const [gameMap, setGameMap] = useState<any[][]>([[]]);

  useEffect(() => {
    setGameMap(generateGameMap(8, 8, null));
    console.log(gameMap);
  }, []);

  return (
    <>
      {gameMap.map((cells, row) => {
        return (
          <div key={row}>
            {cells.map((cell, col) => {
              return (
                <button key={`${row}x${col}`} type="button" className="button">
                  {cell}
                </button>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default GamePage;
