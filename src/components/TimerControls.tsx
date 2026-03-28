import type { TimerStatus } from '../types';
import styles from '../styles/timer.module.css';

interface TimerControlsProps {
  status: TimerStatus;
  isLastPhase: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onNext: () => void;
  onResetPhase: () => void;
  onResetDebate: () => void;
}

export function TimerControls({
  status,
  isLastPhase,
  onStart,
  onPause,
  onResume,
  onNext,
  onResetPhase,
  onResetDebate,
}: TimerControlsProps) {
  return (
    <div className={styles.controls}>
      <div className={styles.controlsMain}>
        {status === 'idle' && (
          <button className={styles.btnStart} onClick={onStart}>
            Start
          </button>
        )}
        {status === 'running' && (
          <button className={styles.btnPause} onClick={onPause}>
            Pause
          </button>
        )}
        {status === 'paused' && (
          <button className={styles.btnResume} onClick={onResume}>
            Resume
          </button>
        )}
      </div>

      <div className={styles.controlsSecondary}>
        {status !== 'idle' && (
          <button className={styles.btnNext} onClick={onNext}>
            {isLastPhase ? 'Finish Debate' : 'Next Phase'}
          </button>
        )}
        <button className={styles.btnSecondary} onClick={onResetPhase}>
          Reset Phase
        </button>
        <button className={styles.btnDanger} onClick={onResetDebate}>
          End Debate
        </button>
      </div>
    </div>
  );
}
