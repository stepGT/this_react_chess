import { FC, useState, useRef, useEffect } from 'react';
import { Player } from '../models/Player';
import { Colors } from '../models/Colors';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const timerRef = useRef<null | ReturnType<typeof setInterval>>(null);
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  //
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const callback =
      currentPlayer?.color === Colors.WHITE ? decrementWhiteTime : decrementBlackTime;
    timerRef.current = setInterval(callback, 1000);
  };
  const handleRestartTimer = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  };
  const decrementBlackTime = () => setBlackTime((prev) => prev - 1);
  const decrementWhiteTime = () => setWhiteTime((prev) => prev - 1);
  //
  useEffect(() => startTimer(), [currentPlayer]);
  return (
    <div className="timer">
      <div>
        <button onClick={handleRestartTimer}>Restart game</button>
      </div>
      <h2>Black Time{blackTime}</h2>
      <h2>White Time{whiteTime}</h2>
    </div>
  );
};

export default Timer;
