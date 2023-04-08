export const CellStatus = {
  PSEUDO: -9,

  NORMAL_UNCLICKED: -2,
  MINE_UNCLICKED: -1,

  NORMAL_CLICKED: 0,
  MINE_CLICKED: 1,

  NORMAL_FLAGED: 2,
  MINE_FLAGED: 2,
};

export const ModeMeta = {
  BEGINNER: { width: 8, height: 8, ratio: 0.1 },
  INTERMEDIATE: { width: 16, height: 16, ratio: 0.15 },
  EXPERT: { width: 32, height: 16, ratio: 0.2 },
};

export type ModeType = keyof typeof ModeMeta;

export const GameStatus = {
  PROGRESS: '😀',
  LOSE: '😂',
  WIN: '🎉',
};
