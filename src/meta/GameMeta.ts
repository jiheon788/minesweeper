export const CellStatus = {
  NORMAL_UNCLICK: -2,
  MINE_UNCLICK: -1,
  NORMAL_CLICK: 0,
  MINE_CLICK: 1,
  FLAG: 2,
};

export const ModeMeta = {
  BEGINNER: { width: 8, height: 8, ratio: 0.1 },
  INTERMEDIATE: { width: 16, height: 16, ratio: 0.15 },
  EXPERT: { width: 32, height: 16, ratio: 0.2 },
  CUSTOM: (width: number, height: number, numOfMine: number) => {
    return {
      width,
      height,
      numOfMine,
    };
  },
};

export type ModeType = keyof typeof ModeMeta;
