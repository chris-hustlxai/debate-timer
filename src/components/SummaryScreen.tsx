import type { DebateState, Side } from '../types';
import { formatTime } from '../utils/formatTime';
import styles from '../styles/summary.module.css';

interface SummaryScreenProps {
  state: DebateState;
  onSetWinner: (side: Side) => void;
  onReset: () => void;
}

export function SummaryScreen({ state, onSetWinner, onReset }: SummaryScreenProps) {
  const prepUsed = state.preset.prepTimeSeconds - Math.max(0, state.prepSecondsRemaining);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Debate Complete</h1>

        <div className={styles.resolution}>{state.resolution}</div>

        <div className={styles.debaters}>
          <div className={`${styles.debater} ${styles.aff}`}>
            <span className={styles.sideLabel}>Affirmative</span>
            <span className={styles.name}>{state.affirmativeName}</span>
          </div>
          <div className={styles.vs}>vs</div>
          <div className={`${styles.debater} ${styles.neg}`}>
            <span className={styles.sideLabel}>Negative</span>
            <span className={styles.name}>{state.negativeName}</span>
          </div>
        </div>

        <p className={styles.prepSummary}>
          Prep time used: {formatTime(prepUsed)} / {formatTime(state.preset.prepTimeSeconds)}
        </p>

        <div className={styles.voteSection}>
          <h2 className={styles.voteTitle}>Audience Vote</h2>
          <div className={styles.voteButtons}>
            <button
              className={`${styles.voteBtn} ${styles.voteAff} ${
                state.winner === 'affirmative' ? styles.voteSelected : ''
              }`}
              onClick={() => onSetWinner('affirmative')}
            >
              {state.affirmativeName} Wins
            </button>
            <button
              className={`${styles.voteBtn} ${styles.voteNeg} ${
                state.winner === 'negative' ? styles.voteSelected : ''
              }`}
              onClick={() => onSetWinner('negative')}
            >
              {state.negativeName} Wins
            </button>
          </div>
        </div>

        <button className={styles.resetBtn} onClick={onReset}>
          New Debate
        </button>
      </div>
    </div>
  );
}
