import { CellStatus } from '@/meta/GameMeta';

export const generateGameMap = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(CellStatus.NORMAL_UNCLICK));
};

export const setRandomMine = (gameMap: number[][], clickPos: number[]) => {
  console.log(clickPos);
  const [x, y] = clickPos;

  for (let i = 0; i < gameMap.length; i++) {
    for (let j = 0; j < gameMap[0].length; j++) {
      if (!(x === i && y === j)) {
        gameMap[i][j] = Math.random() <= 0.1 ? CellStatus.MINE_UNCLICK : CellStatus.NORMAL_UNCLICK;
      }
    }
  }

  return gameMap;
};
