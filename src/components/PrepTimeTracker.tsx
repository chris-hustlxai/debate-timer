import type { Side } from '../types';
import { formatTime } from '../utils/formatTime';
import styles from '../styles/timer.module.css';

interface PrepTimeTrackerProps {
  affName: string;
  negName: string;
  affSeconds: number;
  negSeconds: number;
  activeSide: Side | null;
  onStartPrep: (side: Side) => void;
  onPausePrep: () => void;
}

export function PrepTimeTracker({
  affName,
  negName,
  affSeconds,
  negSeconds,
  activeSide,
  onStartPrep,
  onPausePrep,
}: PrepTimeTrackerProps) {
  return (
    <div className={styles.prepTracker}>
      <h3 className={styles.prepTitle}>Prep Time</h3>
      <div className={styles.prepColumns}>
        <div
          className={`${styles.prepSide} ${styles.prepAff} ${
            activeSide === 'affirmative' ? styles.prepActive : ''
          }`}
        >
          <span className={styles.prepLabel}>{affName}</span>
          <span className={styles.prepTime}>{formatTime(affSeconds)}</span>
          {activeSide === 'affirmative' ? (
            <button className={styles.prepBtn} onClick={onPausePrep}>
              Stop
            </button>
          ) : (
            <button
              className={styles.prepBtn}
              onClick={() => onStartPrep('affirmative')}
              disabled={affSeconds <= 0 || activeSide === 'negative'}
            >
              {affSeconds <= 0 ? 'Used' : 'Start'}
            </button>
          )}
        </div>

        <div
          className={`${styles.prepSide} ${styles.prepNeg} ${
            activeSide === 'negative' ? styles.prepActive : ''
          }`}
        >
          <span className={styles.prepLabel}>{negName}</span>
          <span className={styles.prepTime}>{formatTime(negSeconds)}</span>
          {activeSide === 'negative' ? (
            <button className={styles.prepBtn} onClick={onPausePrep}>
              Stop
            </button>
          ) : (
            <button
              className={styles.prepBtn}
              onClick={() => onStartPrep('negative')}
              disabled={negSeconds <= 0 || activeSide === 'affirmative'}
            >
              {negSeconds <= 0 ? 'Used' : 'Start'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
