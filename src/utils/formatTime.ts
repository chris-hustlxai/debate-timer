export function formatTime(totalSeconds: number): string {
  if (totalSeconds < 0) {
    const abs = Math.abs(totalSeconds);
    const minutes = Math.floor(abs / 60);
    const seconds = abs % 60;
    return `+${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
