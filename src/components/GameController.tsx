import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { initMap } from '@/store/slices/gameSlice';
import { GameStatus, ModeMeta } from '@/meta/GameMeta';

const GameController = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { gameStatus } = useAppSelector((state) => state.gameData);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);

  const onInit = () => {
    const mode = searchParams.get('mode');
    dispatch(initMap({ mode: mode ? mode.toUpperCase() : Object.keys(ModeMeta)[0] }));
    setTime(0);
  };

  useEffect(() => {
    if (gameStatus === 'PROGRESS') {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time, gameStatus]);

  useEffect(() => {
    onInit();
  }, [searchParams]);

  return (
    <div className="game-header">
      <div className="timer">{time}</div>
      <button type="button" className="button" onClick={onInit}>
        {GameStatus[gameStatus as keyof typeof GameStatus]}
      </button>
      <select
        onChange={(e) => {
          searchParams.set('mode', e.target.value.toLowerCase());
          setSearchParams(searchParams);
        }}
        defaultValue={Object.keys(ModeMeta)[0]}
      >
        {Object.keys(ModeMeta).map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameController;
