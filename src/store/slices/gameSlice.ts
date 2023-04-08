import { createSlice } from '@reduxjs/toolkit';
import { generateGameMap } from '@/utils/generator';
import { CellStatus, ModeMeta } from '@/meta/GameMeta';
import { getNumOfMine, setRandomMine } from '@/utils/gameHelper';

const initialState = {
  gameMap: [[0]],
};

/**
 * @summary 게임 관리 slice
 */
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
      const { clickedXPos, clickedYPos, mode } = action.payload;
      const ratio = ModeMeta[mode as keyof typeof ModeMeta].ratio;
      console.log(getNumOfMine(state.gameMap, clickedXPos, clickedYPos));
    },

    /**
     * @title endGame
     * @description 리트라이
     */
    endGame(state, actions) {
      return;
    },
  },
});

export const { initMap, clickCell, startGame } = gameSlice.actions;

export default gameSlice.reducer;
