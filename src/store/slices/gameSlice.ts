import { createSlice } from '@reduxjs/toolkit';
import { generateGameMap } from '@/utils/generator';
import { CellStatus, ModeMeta } from '@/meta/GameMeta';
import { getNumOfMine, setRandomMine } from '@/utils/gameHelper';

const initialState = {
  gameMap: [[0]],
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

      if (state.gameMap[clickedXPos][clickedYPos] === CellStatus.MINE_UNCLICKED) {
        state.gameMap[clickedXPos][clickedYPos] = CellStatus.MINE_CLICKED;
        state.gameStatus = 'LOSE';
      } else {
        state.gameMap[clickedXPos][clickedYPos] = CellStatus.NORMAL_CLICKED;
      }
    },

    endGame(state, actions) {
      return;
    },
  },
});

export const { initMap, clickCell, startGame } = gameSlice.actions;

export default gameSlice.reducer;
