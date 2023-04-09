# Requirements Specifications

## Mandatory Requirements
- [x] 맵 생성
- [x] 첫번째 빈칸을 열었을 경우에는 지뢰가 터지면 안됩니다 
    - [x] 첫 클릭 지뢰 set
    - [x] 탐색시작
- [x] 첫 클릭이후 셀 클릭시 지뢰여부 판단
  - [x] 지뢰있으면 게임 fail
  - [x] 지뢰 칸이 아니고 주변에 지뢰있으면 주변 지뢰 갯수 힌트
  - [x] 지뢰 칸이 아니고 주변에 지뢰가 없으면 범위를 넓혀서 탐지 및 힌트 
- [x] 난이도 변경이 가능해야 합니다
    - [x] Beginner (8X8), Intermediate (16X16), Expert (32X16)

## Optional Requirements
- [x] 게임 타이머 (게임 클리어 시간 확인)
- [x] 게임 Custom (가로, 세로, 지뢰 수 조정 가능)
- [x] 오른쪽 클릭 깃발 기능(좌클릭 막힘)