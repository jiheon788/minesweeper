export const CellStatus = {
  FLAG: -99,
  PSEUDO: -9,
  MINE: -2,
  INITIAL: -1,
  EMPTY: 0,
};

export const GameStatus = {
  READY: '🏁',
  PROGRESS: '😀',
  LOSE: '😂',
  WIN: '🎉',
};

export const CUSTOM_DEFAULT = 10;

export const ModeMeta = {
  BEGINNER: { width: 8, height: 8, ratio: 0.1 },
  INTERMEDIATE: { width: 16, height: 16, ratio: 0.15 },
  EXPERT: { width: 32, height: 16, ratio: 0.2 },
  CUSTOM: { width: CUSTOM_DEFAULT, height: CUSTOM_DEFAULT, ratio: 0.1 },
};

export type ModeType = keyof typeof ModeMeta;
