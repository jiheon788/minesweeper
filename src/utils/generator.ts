import { CellStatus } from '@/meta/GameMeta';
import { ICell } from '@/store/slices/gameSlice';

/**
 * @title 초기 게임 맵 생성
 * @summary 지정한 사이즈의 이중 배열 생성 및 반환
 */
export const generateGameMap = (width: number, height: number) => {
  return Array(height)
    .fill(0)
    .map(() => Array(width).fill({ isOpen: false, value: CellStatus.INITIAL }));
};

/**
 * @title 가상 맵 생성
 * @summary 테두리에 가상 요소를 넣은 맵으로 변환 및 반환
 * @example [[1, 1], [1, 1]] -> [[0 ,0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0 ,0, 0, 0]]
 */
export const generatePseudoMap = (gameMap: ICell[][]) => {
  const pseudoMap = Array.from(Array(gameMap.length + 2), () => Array(gameMap.length + 2).fill(CellStatus.PSEUDO));

  for (let row = 1; row < pseudoMap.length - 1; row++) {
    for (let col = 1; col < pseudoMap[0].length - 1; col++) {
      pseudoMap[row][col] = gameMap[row - 1][col - 1].value;
    }
  }

  return pseudoMap;
};
