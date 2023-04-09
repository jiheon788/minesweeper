# Minesweeper
[![Netlify Status](https://api.netlify.com/api/v1/badges/1d1f3e64-c45c-407f-831e-743bdbfe8f2e/deploy-status)](https://app.netlify.com/sites/classum-02-minesweeper-jiheon788/deploys)

## [Demo](https://classum-02-minesweeper-jiheon788.netlify.app)&nbsp;&nbsp;&nbsp;&nbsp;[요구 사항 목록](./REQUIREMENTS.md)

지뢰찾기 게임 구현 프로젝트입니다. 요구사항을 모두 준수하였습니다. 자주 사용하는 Path Alias, Dynamic Routing, eslint, prettier 설정 등을 위해 [Custom CRA + TypeScript 템플릿](https://github.com/jiheon788/react-boilerplate)으로 제작되었습니다.

## Getting Started

아래 명령어를 따라 직접 설치 및 실행할 수 있습니다. 또는 [라이브 데모](https://classum-02-minesweeper-jiheon788.netlify.app)에서 확인 가능합니다. 

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

- 난이도 변경 (Beginner (8X8), Intermediate (16X16), Expert (32X16))
- 좌클릭(지뢰탐지) & 우클릭(깃발)
- 게임 타이머

## Tech stack

`React`, `TypeScript`, `Redux-toolkit`, `sass`

## Flow
아래 다이어그램의 Flow로 동작합니다.

![mine drawio (1)](https://user-images.githubusercontent.com/90181028/230780040-0454a883-41c1-41b2-86a5-32a765cadeda.png)

## Directory

```bash
src
├─assets
├─components
├─constants
├─meta
├─pages
├─store
│  └─slices
├─styles
│  └─base
└─utils
```