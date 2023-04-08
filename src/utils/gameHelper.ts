import { CellStatus } from '@/meta/GameMeta';
import { generatePseudoMap, generateRandomMine } from './generator';

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

export const isClicked = (cell: number) =>
  [CellStatus.NORMAL_FLAGED, CellStatus.MINE_FLAGED, CellStatus.NORMAL_CLICKED, CellStatus.MINE_CLICKED].includes(cell);

export const isMine = (cell: number) =>
  [CellStatus.MINE_FLAGED, CellStatus.MINE_UNCLICKED, CellStatus.MINE_CLICKED].includes(cell);

export const getNumOfMine = (gameMap: number[][], clickedXPos: number, clickedYPos: number) => {
  const pseudoGameMap = generatePseudoMap(gameMap);

  const getBoardCells = (row: number, col: number) => {
    let boardCells: number[] = [];
    boardCells = boardCells.concat(
      pseudoGameMap[row - 1][col - 1],
      pseudoGameMap[row - 1][col],
      pseudoGameMap[row - 1][col + 1],
    );
    boardCells = boardCells.concat(pseudoGameMap[row][col - 1]);
    boardCells = boardCells.concat(pseudoGameMap[row][col + 1]);
    boardCells = boardCells.concat(
      pseudoGameMap[row + 1][col - 1],
      pseudoGameMap[row + 1][col],
      pseudoGameMap[row + 1][col + 1],
    );

    return boardCells;
  };

  return getBoardCells(clickedXPos + 1, clickedYPos + 1).filter((cell) => isMine(cell)).length;
};
