import { useRef, useCallback } from 'react';

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export function useAudio() {
  const initializedRef = useRef(false);
  const mutedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (!initializedRef.current) {
      getAudioContext();
      initializedRef.current = true;
    }
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    mutedRef.current = muted;
  }, []);

  const playWarningChime = useCallback(() => {
    if (mutedRef.current) return;
    playTone(880, 0.15, 'sine');
    setTimeout(() => playTone(880, 0.15, 'sine'), 200);
  }, []);

  const playTimeUpBell = useCallback(() => {
    if (mutedRef.current) return;
    playTone(440, 0.3, 'sine');
    setTimeout(() => playTone(554, 0.3, 'sine'), 350);
    setTimeout(() => playTone(440, 0.6, 'sine'), 700);
  }, []);

  return { initAudio, setMuted, isMuted: mutedRef, playWarningChime, playTimeUpBell };
}
