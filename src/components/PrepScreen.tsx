import type { DebateState } from '../types';
import { formatTime } from '../utils/formatTime';
import styles from '../styles/prep.module.css';

interface PrepScreenProps {
  state: DebateState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
  onBegin: () => void;
  onResetDebate: () => void;
}

export function PrepScreen({
  state,
  onStart,
  onPause,
  onResume,
  onSkip,
  onBegin,
  onResetDebate,
}: PrepScreenProps) {
  const { prepSecondsRemaining, prepTimerStatus } = state;
  const isFinished = prepSecondsRemaining <= 0;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.resolution}>{state.resolution}</p>

        <h1 className={styles.title}>Prep Time</h1>
        <p className={styles.subtitle}>
          Both debaters prepare simultaneously
        </p>

        <div className={styles.debaters}>
          <div className={styles.aff}>
            <span className={styles.sideDot} data-side="aff" />
            {state.affirmativeName}
          </div>
          <span className={styles.vs}>vs</span>
          <div className={styles.neg}>
            <span className={styles.sideDot} data-side="neg" />
            {state.negativeName}
          </div>
        </div>

        <div className={`${styles.timer} ${isFinished ? styles.timerDone : ''}`}>
          {formatTime(prepSecondsRemaining)}
        </div>

        <div className={styles.controls}>
          {prepTimerStatus === 'idle' && !isFinished && (
            <button className={styles.btnStart} onClick={onStart}>
              Start Prep
            </button>
          )}
          {prepTimerStatus === 'running' && (
            <button className={styles.btnPause} onClick={onPause}>
              Pause
            </button>
          )}
          {prepTimerStatus === 'paused' && !isFinished && (
            <button className={styles.btnResume} onClick={onResume}>
              Resume
            </button>
          )}

          <button className={styles.btnBegin} onClick={onBegin}>
            {isFinished ? 'Begin Debate' : 'Skip to Debate'}
          </button>
        </div>

        <div className={styles.secondary}>
          {!isFinished && prepTimerStatus === 'idle' && (
            <button className={styles.btnSkip} onClick={onSkip}>
              Skip Prep
            </button>
          )}
          <button className={styles.btnBack} onClick={onResetDebate}>
            Back to Setup
          </button>
        </div>
      </div>
    </div>
  );
}
