import { CellStatus } from '@/meta/GameMeta';

export const generateGameMap = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(CellStatus.NORMAL_UNCLICKED));
};

export const generateRandomMine = (ratio: number) =>
  Math.random() <= ratio ? CellStatus.MINE_UNCLICKED : CellStatus.NORMAL_UNCLICKED;

export const setRandomMine = (gameMap: number[][], clickedXPos: number, clickedYPos: number, ratio: number) => {
  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (!(clickedXPos === x && clickedYPos === y)) {
        gameMap[x][y] = generateRandomMine(ratio);
      }
    }
  }

  return gameMap;
};
