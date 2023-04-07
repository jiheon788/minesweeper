export interface IRouterMeta {
  path: string;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const RouterMeta: RouterMetaType = {
  HomePage: {
    path: '/',
  },
  GamePage: {
    path: '/game',
  },
};

export default RouterMeta;
