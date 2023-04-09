import { CellStatus } from '@/meta/GameMeta';
import { ICell } from '@/store/slices/gameSlice';
import { generatePseudoMap } from './generator';

export const setRandomMine = (gameMap: ICell[][], row: number, col: number, ratio: number) => {
  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (!(row === x && col === y)) {
        gameMap[x][y].value = Math.random() <= ratio ? CellStatus.MINE : CellStatus.INITIAL;
      }
    }
  }

  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (gameMap[x][y].value !== CellStatus.MINE) {
        gameMap[x][y].value = getNumOfMine(gameMap, x, y);
      }
    }
  }

  return gameMap;
};

export const getNumOfMine = (gameMap: ICell[][], row: number, col: number) => {
  const pseudoGameMap = generatePseudoMap(gameMap);
  const boardCells: number[] = [];

  for (let i = row; i <= row + 2; i++) {
    for (let j = col; j <= col + 2; j++) {
      boardCells.push(pseudoGameMap[i][j]);
    }
  }

  return boardCells.filter((cell) => cell === CellStatus.MINE).length;
};
