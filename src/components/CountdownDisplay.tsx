import { formatTime } from '../utils/formatTime';
import type { TimerStatus } from '../types';
import styles from '../styles/timer.module.css';

interface CountdownDisplayProps {
  secondsRemaining: number;
  status: TimerStatus;
}

export function CountdownDisplay({
  secondsRemaining,
  status,
}: CountdownDisplayProps) {
  let zone: 'gray' | 'green' | 'yellow' | 'red' | 'redFlash' = 'gray';

  if (status === 'running' || status === 'paused') {
    if (secondsRemaining <= -10) {
      zone = 'redFlash';
    } else if (secondsRemaining <= 0) {
      zone = 'red';
    } else if (secondsRemaining <= 30) {
      zone = 'yellow';
    } else if (secondsRemaining <= 60) {
      zone = 'green';
    } else {
      zone = 'gray';
    }
  } else {
    // idle
    zone = 'gray';
  }

  return (
    <div
      className={`${styles.countdown} ${styles[zone]}`}
      role="timer"
      aria-label={`${formatTime(secondsRemaining)} remaining`}
      aria-live="polite"
    >
      <span className={styles.time}>{formatTime(secondsRemaining)}</span>
      <span className={styles.zoneLabel}>
        {zone === 'redFlash' && 'Over Time'}
        {zone === 'red' && "Time's Up"}
        {zone === 'yellow' && '30 Seconds'}
        {zone === 'green' && '1 Minute'}
        {zone === 'gray' && (status === 'idle' ? 'Ready' : 'In Progress')}
      </span>
    </div>
  );
}
