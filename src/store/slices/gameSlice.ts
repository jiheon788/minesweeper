import { createSlice } from '@reduxjs/toolkit';
import { generateGameMap } from '@/utils/generator';
import { CellStatus, ModeMeta } from '@/meta/GameMeta';
import { setRandomMine } from '@/utils/gameHelper';

export interface ICell {
  value: number;
  isOpen: boolean;
}

export interface IState {
  gameMap: ICell[][];
  gameStatus: 'READY' | 'PROGRESS' | 'LOSE' | 'WIN';
  ratio: number;
}

const initialState = {
  gameMap: [[{ isOpen: false, value: CellStatus.INITIAL }]],
  gameStatus: 'READY',
  ratio: 0.1,
};

const gameSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    /**
     * @summary 게임 초기화 및 셋팅
     */
    initMap(state, action) {
      const { mode } = action.payload;
      const width = ModeMeta[mode as keyof typeof ModeMeta].width;
      const height = ModeMeta[mode as keyof typeof ModeMeta].height;
      state.ratio = ModeMeta[mode as keyof typeof ModeMeta].ratio;
      state.gameMap = generateGameMap(width, height);
      state.gameStatus = 'READY';
    },

    /**
     * @summary 게임 보드 사이즈, 지뢰 비율 조정 및 초기화
     */
    customMap(state, action) {
      const { width, height, ratio } = action.payload;
      state.ratio = ratio;
      state.gameMap = generateGameMap(width, height);
      state.gameStatus = 'READY';
    },

    /**
     * @summary 게임 시작 및 지뢰 세팅
     */
    startGame(state, action) {
      const { clickedXPos, clickedYPos } = action.payload;
      state.gameMap = setRandomMine(state.gameMap, clickedXPos, clickedYPos, state.ratio);
      state.gameStatus = 'PROGRESS';
    },

    /**
     * @summary 셀 클릭 이벤트
     * @branch 지뢰 클릭 -> 모든 셀 오픈 및 게임 종료
     * @branch 현재 셀이 비어 있고 아직 드러나지 않았음 -> 재귀 탐색
     * @branch 범위 밖인 경우 -> skip
     * @branch 현재 셀의 경우  -> skip
     * @branch 현재 셀이 값이 있고, 오픈되지않음 -> open
     */
    clickCell(state, action) {
      const { clickedXPos, clickedYPos } = action.payload;

      const openCell = (row: number, col: number) => {
        if (state.gameMap[row][col].value === CellStatus.MINE) {
          state.gameStatus = 'LOSE';
          state.gameMap.forEach((cells) => {
            cells.forEach((cell) => {
              cell.isOpen = true;
            });
          });
          return;
        }

        if (state.gameMap[row][col].value === 0 && !state.gameMap[row][col].isOpen) {
          state.gameMap[row][col].isOpen = true;

          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              if (i < 0 || i >= state.gameMap.length || j < 0 || j >= state.gameMap[0].length) continue;
              if (i === row && j === col) continue;
              openCell(i, j);
            }
          }
        } else if (state.gameMap[row][col].value > 0 && !state.gameMap[row][col].isOpen) {
          state.gameMap[row][col].isOpen = true;
        }
      };

      if (!state.gameMap[clickedXPos][clickedYPos].isOpen) {
        openCell(clickedXPos, clickedYPos);
      }
    },

    /**
     * @summary 셀 오픈 및 깃발 꽂기
     */
    flagCell(state, action) {
      const { clickedXPos, clickedYPos } = action.payload;
      if (!state.gameMap[clickedXPos][clickedYPos].isOpen) {
        state.gameMap[clickedXPos][clickedYPos].isOpen = true;
        state.gameMap[clickedXPos][clickedYPos].value = CellStatus.FLAG;
      }
    },

    /**
     * @summary 호출 시 게임 승리
     */
    endGame(state) {
      state.gameStatus = 'WIN';
    },
  },
});

export const { initMap, customMap, clickCell, startGame, flagCell, endGame } = gameSlice.actions;

export default gameSlice.reducer;
