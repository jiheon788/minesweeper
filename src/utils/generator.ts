import { CellStatus } from '@/meta/GameMeta';
import { ICell } from '@/store/slices/gameSlice';

export const generateGameMap = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill({ status: CellStatus.NORMAL_UNCLICKED, isOpen: false, value: 0 }));
};

export const generateRandomMine = (ratio: number) =>
  Math.random() <= ratio ? CellStatus.MINE_UNCLICKED : CellStatus.NORMAL_UNCLICKED;

export const generatePseudoMap = (gameMap: ICell[][]) => {
  const pseudoMap = Array.from(Array(gameMap.length + 2), () => Array(gameMap.length + 2).fill(CellStatus.PSEUDO));

  for (let row = 1; row < pseudoMap.length - 1; row++) {
    for (let col = 1; col < pseudoMap[0].length - 1; col++) {
      pseudoMap[row][col] = gameMap[row - 1][col - 1].status;
    }
  }

  return pseudoMap;
};
