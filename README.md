# Minesweeper
[![Netlify Status](https://api.netlify.com/api/v1/badges/1d1f3e64-c45c-407f-831e-743bdbfe8f2e/deploy-status)](https://app.netlify.com/sites/classum-02-minesweeper-jiheon788/deploys)

<img src='https://user-images.githubusercontent.com/90181028/230784312-31df3f63-fa46-4d73-b2cc-202b5068b4e3.png' align='right' width='20%'>

## [Demo](https://classum-02-minesweeper-jiheon788.netlify.app)&nbsp;&nbsp;&nbsp;&nbsp;[Requirements Spec](./REQUIREMENTS.md)


It's a **Minesweeper Game** implementation project. All requirements have been complied with. Created from a [Custom CRA + TypeScript template](https://github.com/jiheon788/react-boilerplate) for frequently used Path Alias, Dynamic Routing, eslint, and Prettier settings.

A brief comment description has been added to the main logic code.

- [src/store/slices/gameSlice.ts](./src/store/slices/gameSlice.ts)
- [src/utils/generator.ts](./src/utils/generator.ts)
- [src/utils/gameHelper.ts](./src/utils/gameHelper.ts)


## Getting Started

You can install and run it yourself by following the commands. Or You can view a [live demo](https://classum-02-minesweeper-jiheon788.netlify.app) 

#### Install
```
npm i
```
#### Build
```
npm run build
```
#### Start
```
npm start
```

## Features

- CRU- Game board
- Change the level using a query string Custom hook (Beginner, Intermediate, Expert)
- Recursive mine detection (left click)
- Flagging a mine cell (right click)
- Game timer (result of the game)
- Custom game config using Custom hook (width, height, ratio of mine)

## Tech stack

`React`, `TypeScript`, `Redux-toolkit`, `sass`, `react-router-dom`, `craco`

## Flow

![mine drawio (1)](https://user-images.githubusercontent.com/90181028/230780040-0454a883-41c1-41b2-86a5-32a765cadeda.png)

## Directory

```bash
src
├─components 
├─meta 
├─pages 
├─store 
│  └─slices
├─styles 
│  └─base
└─utils
```

## Demo of this project

![MINE](https://user-images.githubusercontent.com/90181028/230796037-29598c4c-17f2-40e9-8a43-1548e748b70e.gif)
