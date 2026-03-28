import { useDebate } from './hooks/useDebate';
import { SetupScreen } from './components/SetupScreen';
import { PrepScreen } from './components/PrepScreen';
import { TimerScreen } from './components/TimerScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const debate = useDebate();
  const { screen } = debate.state;

  return (
    <>
      <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100, display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => debate.setSoundEnabled((p) => !p)}
          aria-label={debate.soundEnabled ? 'Mute sound' : 'Unmute sound'}
          style={{
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '0.5rem 0.75rem',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          {debate.soundEnabled ? 'Sound On' : 'Sound Off'}
        </button>
        <ThemeToggle />
      </div>
      {screen === 'setup' && <SetupScreen onStart={debate.startDebate} />}
      {screen === 'prep' && (
        <PrepScreen
          state={debate.state}
          onStart={debate.startPrepBoth}
          onPause={debate.pausePrepBoth}
          onResume={debate.resumePrepBoth}
          onSkip={debate.skipPrep}
          onBegin={debate.beginDebate}
          onResetDebate={debate.resetDebate}
        />
      )}
      {screen === 'timer' && (
        <TimerScreen
          state={debate.state}
          onStart={debate.startPhase}
          onPause={debate.pausePhase}
          onResume={debate.resumePhase}
          onNext={debate.nextPhase}
          onResetPhase={debate.resetPhase}
          onResetDebate={debate.resetDebate}
        />
      )}
      {screen === 'summary' && (
        <SummaryScreen
          state={debate.state}
          onSetWinner={debate.setWinner}
          onReset={debate.resetDebate}
        />
      )}
    </>
  );
}

export default App;
