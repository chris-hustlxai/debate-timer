import { useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  onTick?: (secondsRemaining: number) => void;
  onWarning?: () => void;
  onExpire?: () => void;
  warningThreshold?: number;
}

export function useTimer(options: UseTimerOptions = {}) {
  const intervalRef = useRef<number | null>(null);
  const warningFiredRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const expireFiredRef = useRef(false);

  const startCountdown = useCallback(
    (getSeconds: () => number, tickDown: () => void, options?: { stopAtZero?: boolean }) => {
      clearTimer();
      warningFiredRef.current = false;
      expireFiredRef.current = false;

      intervalRef.current = window.setInterval(() => {
        const current = getSeconds();

        // For prep timer: stop at zero
        if (options?.stopAtZero && current <= 1) {
          clearTimer();
          tickDown();
          optionsRef.current.onExpire?.();
          return;
        }

        tickDown();
        const next = current - 1;
        optionsRef.current.onTick?.(next);

        // Fire expire once when crossing zero
        if (!expireFiredRef.current && next <= 0) {
          expireFiredRef.current = true;
          optionsRef.current.onExpire?.();
        }

        const threshold = optionsRef.current.warningThreshold ?? 60;
        if (!warningFiredRef.current && next <= threshold && next > 0) {
          warningFiredRef.current = true;
          optionsRef.current.onWarning?.();
        }
      }, 1000);
    },
    [clearTimer]
  );

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return { startCountdown, clearTimer };
}
