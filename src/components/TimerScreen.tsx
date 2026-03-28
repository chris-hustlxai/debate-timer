import type { DebateState } from '../types';
import { CountdownDisplay } from './CountdownDisplay';
import { PhaseProgressBar } from './PhaseProgressBar';
import { TimerControls } from './TimerControls';
import styles from '../styles/timer.module.css';

interface TimerScreenProps {
  state: DebateState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onNext: () => void;
  onResetPhase: () => void;
  onResetDebate: () => void;
}

export function TimerScreen({
  state,
  onStart,
  onPause,
  onResume,
  onNext,
  onResetPhase,
  onResetDebate,
}: TimerScreenProps) {
  const currentPhase = state.preset.phases[state.currentPhaseIndex];
  const isLastPhase = state.currentPhaseIndex === state.preset.phases.length - 1;

  const speakerLabel =
    currentPhase.speaker === 'both'
      ? `${state.negativeName} & ${state.affirmativeName}`
      : currentPhase.speaker === 'affirmative'
        ? state.affirmativeName
        : state.negativeName;

  return (
    <div className={styles.container}>
      <div className={styles.resolution}>{state.resolution}</div>

      <PhaseProgressBar
        phases={state.preset.phases}
        currentIndex={state.currentPhaseIndex}
      />

      <div className={styles.phaseInfo}>
        <span className={styles.phaseNumber}>
          Phase {state.currentPhaseIndex + 1} of {state.preset.phases.length}
        </span>
        <h2 className={styles.phaseName}>{currentPhase.name}</h2>
        <p className={styles.phaseSpeaker}>{speakerLabel}</p>
        <p className={styles.phaseDesc}>{currentPhase.description}</p>
      </div>

      <CountdownDisplay
        secondsRemaining={state.phaseSecondsRemaining}
        status={state.phaseTimerStatus}
      />

      <TimerControls
        status={state.phaseTimerStatus}
        isLastPhase={isLastPhase}
        onStart={onStart}
        onPause={onPause}
        onResume={onResume}
        onNext={onNext}
        onResetPhase={onResetPhase}
        onResetDebate={onResetDebate}
      />
    </div>
  );
}
