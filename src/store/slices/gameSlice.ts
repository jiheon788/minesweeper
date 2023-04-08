import { createSlice } from '@reduxjs/toolkit';
import { generateGameMap, setRandomMine } from '@/utils/generator';
import { ModeMeta } from '@/meta/GameMeta';

const initialState = {
  isStart: false,
  gameMap: [[0]],
};

/**
 * @summary 게임 관리 slice
 */
const gameSlice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    /**
     * @title initMap
     * @description  초기 맵 생성 (기본값)
     */
    initMap(state, actions) {
      const { mode } = actions.payload;
      const width = ModeMeta[mode as keyof typeof ModeMeta].width;
      const height = ModeMeta[mode as keyof typeof ModeMeta].height;

      state.gameMap = generateGameMap(width, height);
      state.isStart = false;
    },

    /**
     * @title startGame
     * @description 게임 시작 및 지뢰 세팅
     */
    startGame(state, actions) {
      return;
    },

    /**
     * @title clickCell
     * @description 사용자 클릭 이벤트
     * 1. 지뢰 o
     * 2. 지뢰 x, 인접 셀 지뢰 o
     * 3. 지뢰 x, 인접 셀 지뢰 x
     */
    clickCell(state, action) {
      const { clickedXPos, clickedYPos, mode } = action.payload;
      const ratio = ModeMeta[mode as keyof typeof ModeMeta].ratio;

      if (!state.isStart) {
        console.log('setMIne');
        state.gameMap = setRandomMine(state.gameMap, clickedXPos, clickedYPos, ratio);
        state.isStart = true;
      }
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

export const { initMap, clickCell } = gameSlice.actions;

export default gameSlice.reducer;
