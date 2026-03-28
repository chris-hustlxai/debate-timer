import { useReducer, useCallback, useRef, useEffect, useState } from 'react';
import type { Side, DebateSetup } from '../types';
import { debateReducer, initialState } from './debateReducer';
import { useTimer } from './useTimer';
import { useAudio } from './useAudio';

export function useDebate() {
  const [state, dispatch] = useReducer(debateReducer, initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const [soundEnabled, setSoundEnabled] = useState(false);
  const { initAudio, setMuted, playWarningChime, playTimeUpBell } = useAudio();

  useEffect(() => {
    setMuted(!soundEnabled);
  }, [soundEnabled, setMuted]);

  const audioFiredRef = useRef({ sixty: false, thirty: false, zero: false });

  const phaseTimer = useTimer({
    onExpire: playTimeUpBell,
  });

  const prepTimer = useTimer({
    onExpire: playTimeUpBell,
  });

  // Fire audio at zone transitions (60s, 30s, 0s) for phase timer
  useEffect(() => {
    const secs = state.phaseSecondsRemaining;
    if (state.phaseTimerStatus !== 'running') return;

    if (!audioFiredRef.current.sixty && secs <= 60 && secs > 0) {
      audioFiredRef.current.sixty = true;
      playWarningChime();
    }
    if (!audioFiredRef.current.thirty && secs <= 30 && secs > 0) {
      audioFiredRef.current.thirty = true;
      playWarningChime();
    }
    if (!audioFiredRef.current.zero && secs <= 0) {
      audioFiredRef.current.zero = true;
      playTimeUpBell();
    }
  }, [state.phaseSecondsRemaining, state.phaseTimerStatus, playWarningChime, playTimeUpBell]);

  // Reset audio flags when phase changes
  useEffect(() => {
    audioFiredRef.current = { sixty: false, thirty: false, zero: false };
  }, [state.currentPhaseIndex]);

  // Manage phase timer interval — keeps running past 0 into overtime
  useEffect(() => {
    if (state.phaseTimerStatus === 'running') {
      phaseTimer.startCountdown(
        () => stateRef.current.phaseSecondsRemaining,
        () => dispatch({ type: 'TICK_PHASE' }),
      );
    } else {
      phaseTimer.clearTimer();
    }
  }, [state.phaseTimerStatus, state.currentPhaseIndex, phaseTimer]);

  // Manage shared prep timer — both sides count down together, stops at zero
  useEffect(() => {
    if (state.prepTimerStatus === 'running') {
      prepTimer.startCountdown(
        () => stateRef.current.prepSecondsRemaining,
        () => dispatch({ type: 'TICK_PREP_BOTH' }),
        { stopAtZero: true },
      );
    } else {
      prepTimer.clearTimer();
    }
  }, [state.prepTimerStatus, prepTimer]);

  const startDebate = useCallback(
    (setup: DebateSetup) => {
      initAudio();
      dispatch({ type: 'START_DEBATE', payload: setup });
    },
    [initAudio]
  );

  const startPrepBoth = useCallback(() => dispatch({ type: 'START_PREP_BOTH' }), []);
  const pausePrepBoth = useCallback(() => dispatch({ type: 'PAUSE_PREP_BOTH' }), []);
  const resumePrepBoth = useCallback(() => dispatch({ type: 'RESUME_PREP_BOTH' }), []);
  const skipPrep = useCallback(() => dispatch({ type: 'SKIP_PREP' }), []);
  const beginDebate = useCallback(() => dispatch({ type: 'BEGIN_DEBATE' }), []);

  const startPhase = useCallback(() => dispatch({ type: 'START_PHASE' }), []);
  const pausePhase = useCallback(() => dispatch({ type: 'PAUSE_PHASE' }), []);
  const resumePhase = useCallback(() => dispatch({ type: 'RESUME_PHASE' }), []);
  const resetPhase = useCallback(() => dispatch({ type: 'RESET_PHASE' }), []);
  const nextPhase = useCallback(() => dispatch({ type: 'NEXT_PHASE' }), []);
  const setWinner = useCallback(
    (side: Side) => dispatch({ type: 'SET_WINNER', payload: side }),
    []
  );
  const resetDebate = useCallback(() => dispatch({ type: 'RESET_DEBATE' }), []);

  return {
    state,
    soundEnabled,
    setSoundEnabled,
    startDebate,
    startPrepBoth,
    pausePrepBoth,
    resumePrepBoth,
    skipPrep,
    beginDebate,
    startPhase,
    pausePhase,
    resumePhase,
    resetPhase,
    nextPhase,
    setWinner,
    resetDebate,
  };
}
