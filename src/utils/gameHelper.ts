import { CellStatus } from '@/meta/GameMeta';
import { ICell } from '@/store/slices/gameSlice';
import { generatePseudoMap } from './generator';

/**
 * @title 지뢰 세팅 함수
 * @summary 게임 맵을 순회하며 지정 비율로 지뢰 세팅, 지뢰 셀이 아니면 주변의 지뢰 갯수를 넣어준다.
 */
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

/**
 * @title 지뢰 갯수 탐지 함수
 * @summary 지정한 셀의 가장자리 셀 탐지 및 지뢰 수 반환
 */
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
