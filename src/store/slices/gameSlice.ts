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
  gameStatus: string;
}

const initialState = {
  gameMap: [[{ isOpen: false, value: CellStatus.INITIAL }]],
  gameStatus: 'READY',
};

const gameSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    initMap(state, actions) {
      const { mode } = actions.payload;
      const width = ModeMeta[mode as keyof typeof ModeMeta].width;
      const height = ModeMeta[mode as keyof typeof ModeMeta].height;
      state.gameMap = generateGameMap(width, height);
      state.gameStatus = 'READY';
    },

    startGame(state, action) {
      const { clickedXPos, clickedYPos, mode } = action.payload;
      const ratio = ModeMeta[mode as keyof typeof ModeMeta].ratio;
      state.gameMap = setRandomMine(state.gameMap, clickedXPos, clickedYPos, ratio);
      state.gameStatus = 'PROGRESS';
    },

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

        // 현재 셀이 비어 있고 아직 드러나지 않았음 -> 인접셀 표시
        if (state.gameMap[row][col].value === 0 && !state.gameMap[row][col].isOpen) {
          state.gameMap[row][col].isOpen = true;

          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              // 범위 밖인 경우 skip
              if (i < 0 || i >= state.gameMap.length || j < 0 || j >= state.gameMap[0].length) continue;
              // 현재 셀의 경우 skip
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

    flagCell(state, action) {
      const { clickedXPos, clickedYPos } = action.payload;
      if (!state.gameMap[clickedXPos][clickedYPos].isOpen) {
        state.gameMap[clickedXPos][clickedYPos].isOpen = true;
        state.gameMap[clickedXPos][clickedYPos].value = CellStatus.FLAG;
      }
    },
  },
});

export const { initMap, clickCell, startGame, flagCell } = gameSlice.actions;

export default gameSlice.reducer;
