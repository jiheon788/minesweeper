import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { customMap, initMap } from '@/store/slices/gameSlice';
import { CUSTOM_DEFAULT, GameStatus, ModeMeta } from '@/meta/GameMeta';
import useQueryString from '@/hooks/useQueryString';
import useInputs from '@/hooks/useInputs';

const GameController = () => {
  const { searchParams, getParams, setParams } = useQueryString();
  const [gameConfig, onChangeGameConfig] = useInputs({
    width: CUSTOM_DEFAULT,
    height: CUSTOM_DEFAULT,
    ratio: CUSTOM_DEFAULT / 100,
  });
  const { gameStatus } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);

  const onInit = () => {
    const mode = getParams('mode').toUpperCase();
    dispatch(initMap({ mode: mode ? mode : Object.keys(ModeMeta)[0] }));
  };

  useEffect(() => {
    onInit();
  }, [searchParams]);

  useEffect(() => {
    if (gameStatus === 'PROGRESS') {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time, gameStatus]);

  const onStartCustom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      customMap({ width: Number(gameConfig.width), height: Number(gameConfig.width), ratio: Number(gameConfig.ratio) }),
    );
  };

  return (
    <>
      <div className="game-header">
        <div className="timer">{time}</div>
        <button type="button" className="button" onClick={onInit}>
          {GameStatus[gameStatus as keyof typeof GameStatus]}
        </button>
        <select
          onChange={(e) => setParams('mode', e.target.value.toLowerCase())}
          defaultValue={getParams('mode') ? getParams('mode').toUpperCase() : Object.keys(ModeMeta)[0]}
        >
          {Object.keys(ModeMeta).map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>
      {getParams('mode') === 'custom' ? (
        <form className="custom-form" onSubmit={onStartCustom}>
          <label>
            {' '}
            Width:
            <input type="number" name="width" min="1" defaultValue={gameConfig.width} onChange={onChangeGameConfig} />
          </label>
          <label>
            {' '}
            Height:
            <input type="number" name="height" min="1" defaultValue={gameConfig.height} onChange={onChangeGameConfig} />
          </label>
          <label>
            {' '}
            Rate of mine:
            <input
              type="number"
              name="ratio"
              min="0.1"
              max="0.9"
              step="0.1"
              defaultValue={gameConfig.ratio}
              onChange={onChangeGameConfig}
            />
          </label>
          <button type="submit" className="button has-border">
            Reset
          </button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};

export default GameController;
