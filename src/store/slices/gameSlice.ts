import { createSlice } from '@reduxjs/toolkit';
import { generateGameMap } from '@/utils/generator';
import { CellStatus, ModeMeta } from '@/meta/GameMeta';
import { setRandomMine } from '@/utils/gameHelper';

export interface ICell {
  value: any;
  isOpen: boolean;
}

export interface IState {
  gameMap: {
    isOpen: boolean;
    value: number;
  }[][];
  gameStatus: string;
}

const initialState = {
  gameMap: [[{ isOpen: false, value: 0 }]],
  gameStatus: 'PROGRESS',
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
    },

    startGame(state, action) {
      const { clickedXPos, clickedYPos, mode } = action.payload;
      const ratio = ModeMeta[mode as keyof typeof ModeMeta].ratio;
      state.gameMap = setRandomMine(state.gameMap, clickedXPos, clickedYPos, ratio);
    },

    clickCell(state, action) {
      const { clickedXPos, clickedYPos } = action.payload;

      const openCell = (row: number, col: number) => {
        const cell = state.gameMap[row][col];

        if (state.gameMap[row][col].value === -2) {
          return 0;
        }

        const numRows = state.gameMap.length;
        const numCols = state.gameMap[0].length;

        if (cell.value === 0 && !cell.isOpen) {
          // The current cell is empty and hasn't been revealed yet, so reveal it and its adjacent cells
          cell.isOpen = true;

          // Check all adjacent cells
          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              // Skip cells that are outside the game board
              if (i < 0 || i >= numRows || j < 0 || j >= numCols) {
                continue;
              }

              // Skip the current cell
              if (i === row && j === col) {
                continue;
              }

              openCell(i, j);
            }
          }
        } else if (cell.value > 0 && !cell.isOpen) {
          cell.isOpen = true;
        }
      };

      openCell(clickedXPos, clickedYPos);
    },

    endGame(state, actions) {
      return;
    },
  },
});

export const { initMap, clickCell, startGame } = gameSlice.actions;

export default gameSlice.reducer;
