import { CellStatus } from '@/meta/GameMeta';
import { ICell } from '@/store/slices/gameSlice';
import { generatePseudoMap, generateRandomMine } from './generator';

export const setRandomMine = (gameMap: ICell[][], clickedXPos: number, clickedYPos: number, ratio: number) => {
  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (!(clickedXPos === x && clickedYPos === y)) {
        gameMap[x][y].value = Math.random() <= ratio ? -2 : -1;
      }
    }
  }

  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (gameMap[x][y].value !== -2) {
        gameMap[x][y].value = getNumOfMine(gameMap, x, y);
      }
    }
  }

  return gameMap;
};

export const getNumOfMine = (gameMap: ICell[][], clickedXPos: number, clickedYPos: number) => {
  const pseudoGameMap = generatePseudoMap(gameMap);
  // const pseudoGameMap = JSON.parse(JSON.stringify(gameMap));

  const getBoardCells = (row: number, col: number) => {
    const boardCells: number[] = [];

    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        boardCells.push(pseudoGameMap[i][j]);
      }
    }

    return boardCells;
  };

  return getBoardCells(clickedXPos + 1, clickedYPos + 1).filter((cell) => cell === -2).length;
};
