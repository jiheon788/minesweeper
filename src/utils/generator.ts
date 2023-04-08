import { CellStatus, ModeMeta } from '@/meta/GameMeta';

export const generateGameMap = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill(CellStatus.NORMAL_UNCLICK));
};

export const generateRandomMine = () =>
  Math.random() <= ModeMeta.BEGINNER.ratio ? CellStatus.MINE_UNCLICK : CellStatus.NORMAL_UNCLICK;

export const setRandomMine = (gameMap: number[][], clickXPos: number, clickYPos: number) => {
  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (!(clickXPos === x && clickYPos === y)) {
        gameMap[x][y] = generateRandomMine();
      }
    }
  }

  return gameMap;
};
