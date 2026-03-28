import type { Phase } from '../types';
import styles from '../styles/timer.module.css';

interface PhaseProgressBarProps {
  phases: Phase[];
  currentIndex: number;
}

export function PhaseProgressBar({ phases, currentIndex }: PhaseProgressBarProps) {
  return (
    <div className={styles.progressBar} role="navigation" aria-label="Debate phases">
      {phases.map((phase, i) => {
        let status: 'completed' | 'current' | 'upcoming' = 'upcoming';
        if (i < currentIndex) status = 'completed';
        else if (i === currentIndex) status = 'current';

        return (
          <div key={phase.id} className={styles.progressStep}>
            {i > 0 && (
              <div
                className={`${styles.progressLine} ${
                  i <= currentIndex ? styles.progressLineFilled : ''
                }`}
              />
            )}
            <div
              className={`${styles.progressCircle} ${styles[`progress_${status}`]}`}
              aria-label={`${phase.name} — ${status}`}
              title={phase.name}
            >
              {status === 'completed' ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7L6 10L11 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <span className={styles.progressAbbrev}>{phase.abbreviation}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
