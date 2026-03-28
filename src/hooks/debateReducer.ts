import type { DebateState, DebateAction } from '../types';
import { CLUB_LD } from '../constants';

export const initialState: DebateState = {
  screen: 'setup',
  resolution: '',
  affirmativeName: '',
  negativeName: '',
  preset: CLUB_LD,
  currentPhaseIndex: 0,
  phaseSecondsRemaining: 0,
  phaseTimerStatus: 'idle',
  prepSecondsRemaining: 0,
  prepTimerStatus: 'idle',
  phaseLog: [],
  winner: null,
};

export function debateReducer(state: DebateState, action: DebateAction): DebateState {
  switch (action.type) {
    case 'START_DEBATE': {
      const { resolution, affirmativeName, negativeName, preset } = action.payload;
      return {
        ...initialState,
        screen: 'prep',
        resolution,
        affirmativeName,
        negativeName,
        preset,
        prepSecondsRemaining: preset.prepTimeSeconds,
        prepTimerStatus: 'idle',
      };
    }

    case 'START_PREP_BOTH':
      return { ...state, prepTimerStatus: 'running' };

    case 'PAUSE_PREP_BOTH':
      return { ...state, prepTimerStatus: 'paused' };

    case 'RESUME_PREP_BOTH':
      return { ...state, prepTimerStatus: 'running' };

    case 'TICK_PREP_BOTH': {
      const next = state.prepSecondsRemaining - 1;
      return { ...state, prepSecondsRemaining: next };
    }

    case 'SKIP_PREP':
    case 'BEGIN_DEBATE':
      return {
        ...state,
        screen: 'timer',
        prepTimerStatus: 'idle',
        currentPhaseIndex: 0,
        phaseSecondsRemaining: state.preset.phases[0].durationSeconds,
        phaseTimerStatus: 'idle',
      };

    case 'START_PHASE':
      return {
        ...state,
        phaseTimerStatus: 'running',
        phaseLog: state.phaseLog.some((e) => e.phaseIndex === state.currentPhaseIndex)
          ? state.phaseLog
          : [
              ...state.phaseLog,
              {
                phaseIndex: state.currentPhaseIndex,
                startedAt: Date.now(),
                endedAt: null,
                timeUsedSeconds: 0,
              },
            ],
      };

    case 'PAUSE_PHASE':
      return { ...state, phaseTimerStatus: 'paused' };

    case 'RESUME_PHASE':
      return { ...state, phaseTimerStatus: 'running' };

    case 'RESET_PHASE':
      return {
        ...state,
        phaseSecondsRemaining: state.preset.phases[state.currentPhaseIndex].durationSeconds,
        phaseTimerStatus: 'idle',
      };

    case 'NEXT_PHASE': {
      const nextIndex = state.currentPhaseIndex + 1;
      if (nextIndex >= state.preset.phases.length) {
        return {
          ...state,
          screen: 'summary',
          phaseTimerStatus: 'idle',
        };
      }
      return {
        ...state,
        currentPhaseIndex: nextIndex,
        phaseSecondsRemaining: state.preset.phases[nextIndex].durationSeconds,
        phaseTimerStatus: 'idle',
      };
    }

    case 'TICK_PHASE':
      return {
        ...state,
        phaseSecondsRemaining: state.phaseSecondsRemaining - 1,
      };

    case 'SET_WINNER':
      return { ...state, winner: action.payload };

    case 'RESET_DEBATE':
      return initialState;

    default:
      return state;
  }
}
