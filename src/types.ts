export type Screen = 'setup' | 'prep' | 'timer' | 'summary';

export type Side = 'affirmative' | 'negative';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface Phase {
  id: number;
  name: string;
  abbreviation: string;
  speaker: Side | 'both';
  description: string;
  durationSeconds: number;
}

export interface TimingPreset {
  id: string;
  label: string;
  phases: Phase[];
  prepTimeSeconds: number;
  warningThresholdSeconds: number;
}

export interface DebateSetup {
  resolution: string;
  affirmativeName: string;
  negativeName: string;
  preset: TimingPreset;
}

export interface PhaseLogEntry {
  phaseIndex: number;
  startedAt: number;
  endedAt: number | null;
  timeUsedSeconds: number;
}

export interface DebateState {
  screen: Screen;
  resolution: string;
  affirmativeName: string;
  negativeName: string;
  preset: TimingPreset;
  currentPhaseIndex: number;
  phaseSecondsRemaining: number;
  phaseTimerStatus: TimerStatus;
  prepSecondsRemaining: number;
  prepTimerStatus: TimerStatus;
  phaseLog: PhaseLogEntry[];
  winner: Side | null;
}

export type DebateAction =
  | { type: 'START_DEBATE'; payload: DebateSetup }
  | { type: 'START_PHASE' }
  | { type: 'PAUSE_PHASE' }
  | { type: 'RESUME_PHASE' }
  | { type: 'RESET_PHASE' }
  | { type: 'NEXT_PHASE' }
  | { type: 'TICK_PHASE' }
  | { type: 'START_PREP_BOTH' }
  | { type: 'PAUSE_PREP_BOTH' }
  | { type: 'RESUME_PREP_BOTH' }
  | { type: 'TICK_PREP_BOTH' }
  | { type: 'SKIP_PREP' }
  | { type: 'BEGIN_DEBATE' }
  | { type: 'SET_WINNER'; payload: Side }
  | { type: 'RESET_DEBATE' };
