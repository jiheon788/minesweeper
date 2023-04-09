import { createSlice } from '@reduxjs/toolkit';
import { generateGameMap } from '@/utils/generator';
import { CellStatus, ModeMeta } from '@/meta/GameMeta';
import { getNumOfMine, openCell, setRandomMine } from '@/utils/gameHelper';

export interface ICell {
  value: any;
  status: number;
  isOpen: boolean;
}

export interface IState {
  gameMap: {
    status: number;
    isOpen: boolean;
    value: number;
  }[][];
  gameStatus: string;
}

const initialState = {
  gameMap: [[{ status: 0, isOpen: false, value: 0 }]],
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
      state.gameMap = openCell(state.gameMap, clickedXPos, clickedYPos);
    },

    endGame(state, actions) {
      return;
    },
  },
});

export const { initMap, clickCell, startGame } = gameSlice.actions;

export default gameSlice.reducer;
