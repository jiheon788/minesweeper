import { CellStatus } from '@/meta/GameMeta';
import { ICell } from '@/store/slices/gameSlice';
import { generatePseudoMap, generateRandomMine } from './generator';

export const setRandomMine = (gameMap: ICell[][], clickedXPos: number, clickedYPos: number, ratio: number) => {
  for (let x = 0; x < gameMap.length; x++) {
    for (let y = 0; y < gameMap[0].length; y++) {
      if (!(clickedXPos === x && clickedYPos === y)) {
        gameMap[x][y].status = generateRandomMine(ratio);
      }
    }
  }

  return gameMap;
};

export const isClicked = (cell: number) =>
  [CellStatus.NORMAL_FLAGED, CellStatus.MINE_FLAGED, CellStatus.NORMAL_CLICKED, CellStatus.MINE_CLICKED].includes(cell);

export const isMine = (cell: number) =>
  [CellStatus.MINE_FLAGED, CellStatus.MINE_UNCLICKED, CellStatus.MINE_CLICKED].includes(cell);

export const getNumOfMine = (gameMap: ICell[][], clickedXPos: number, clickedYPos: number) => {
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

export const openCell = (gameMap: ICell[][], clickedXPos: number, clickedYPos: number) => {
  const copiedMap = JSON.parse(JSON.stringify(gameMap));

  const clickCell = (x: number, y: number) => {
    if (copiedMap[x][y].isOpen) return;
    if (copiedMap[x][y].status === CellStatus.MINE_UNCLICKED) {
      copiedMap[x][y].status = CellStatus.MINE_CLICKED;
    } else {
      copiedMap[x][y].status = CellStatus.NORMAL_CLICKED;
    }
    copiedMap[x][y].value = getNumOfMine(copiedMap, x, y);
    copiedMap[x][y].isOpen = true;
  };

  const coordinates = [[clickedXPos, clickedYPos]];

  const getBoards = (x: number, y: number) => {
    if (x > 0 && y > 0) coordinates.push([x - 1, y - 1]);
    if (x > 0) coordinates.push([x - 1, y]);
    if (x > 0 && y < copiedMap[0].length - 1) coordinates.push([x - 1, y + 1]);
    if (y > 0) coordinates.push([x, y - 1]);
    if (y < copiedMap[0].length - 1) coordinates.push([x, y + 1]);
    if (x < copiedMap.length - 1 && y > 0) coordinates.push([x + 1, y - 1]);
    if (x < copiedMap.length - 1) coordinates.push([x + 1, y]);
    if (x < copiedMap.length - 1 && y < copiedMap[0].length - 1) coordinates.push([x + 1, y + 1]);
  };

  getBoards(clickedXPos, clickedYPos);

  console.log(coordinates);

  coordinates.forEach((coordinate) => {
    const [x, y] = coordinate;
    clickCell(x, y);
  });

  return copiedMap;
};
