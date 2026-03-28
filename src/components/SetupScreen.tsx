import { useState } from 'react';
import type { DebateSetup, TimingPreset, Phase } from '../types';
import { PRESETS, CLUB_LD, PHASE_TEMPLATES } from '../constants';
import { formatTime } from '../utils/formatTime';
import styles from '../styles/setup.module.css';

interface SetupScreenProps {
  onStart: (setup: DebateSetup) => void;
}

let nextId = 100;

function createPhaseFromTemplate(templateIndex: number): Phase {
  const t = PHASE_TEMPLATES[templateIndex];
  return {
    id: nextId++,
    name: t.name,
    abbreviation: t.abbreviation,
    speaker: t.speaker,
    description: t.description,
    durationSeconds: t.defaultDurationSeconds,
  };
}

export function SetupScreen({ onStart }: SetupScreenProps) {
  const [resolution, setResolution] = useState('');
  const [affirmativeName, setAffirmativeName] = useState('');
  const [negativeName, setNegativeName] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('club');
  const [customPhases, setCustomPhases] = useState<Phase[]>(
    CLUB_LD.phases.map((p) => ({ ...p })),
  );
  const [customPrepTime, setCustomPrepTime] = useState(4);
  const [customWarning, setCustomWarning] = useState(60);

  const isCustom = selectedPresetId === 'custom';

  const getPreset = (): TimingPreset => {
    if (isCustom) {
      return {
        id: 'custom',
        label: 'Custom',
        phases: customPhases.map((p, i) => ({ ...p, id: i + 1 })),
        prepTimeSeconds: customPrepTime * 60,
        warningThresholdSeconds: customWarning,
      };
    }
    return PRESETS.find((p) => p.id === selectedPresetId) ?? CLUB_LD;
  };

  const addPhase = () => {
    setCustomPhases((prev) => [...prev, createPhaseFromTemplate(0)]);
  };

  const removePhase = (index: number) => {
    setCustomPhases((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePhaseTemplate = (index: number, templateIndex: number) => {
    const t = PHASE_TEMPLATES[templateIndex];
    setCustomPhases((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              ...p,
              name: t.name,
              abbreviation: t.abbreviation,
              speaker: t.speaker,
              description: t.description,
              durationSeconds: t.defaultDurationSeconds,
            }
          : p,
      ),
    );
  };

  const updatePhaseDuration = (index: number, minutes: number) => {
    setCustomPhases((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, durationSeconds: Math.max(0, minutes * 60) } : p,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolution.trim()) return;
    if (isCustom && customPhases.length === 0) return;

    onStart({
      resolution: resolution.trim(),
      affirmativeName: affirmativeName.trim() || 'Affirmative',
      negativeName: negativeName.trim() || 'Negative',
      preset: getPreset(),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Lincoln-Douglas Debate Timer</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor='resolution' className={styles.label}>
              Resolution
            </label>
            <textarea
              id='resolution'
              className={styles.textarea}
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              placeholder='Enter the debate resolution...'
              rows={2}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor='affirmative' className={styles.label}>
                <span className={styles.affDot} /> Affirmative
              </label>
              <input
                id='affirmative'
                type='text'
                value={affirmativeName}
                onChange={(e) => setAffirmativeName(e.target.value)}
                placeholder='Debater name'
              />
            </div>
            <div className={styles.field}>
              <label htmlFor='negative' className={styles.label}>
                <span className={styles.negDot} /> Negative
              </label>
              <input
                id='negative'
                type='text'
                value={negativeName}
                onChange={(e) => setNegativeName(e.target.value)}
                placeholder='Debater name'
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Timing Preset</label>
            <div className={styles.presetGroup}>
              {PRESETS.map((preset) => (
                <label key={preset.id} className={styles.presetOption}>
                  <input
                    type='radio'
                    name='preset'
                    value={preset.id}
                    checked={selectedPresetId === preset.id}
                    onChange={() => setSelectedPresetId(preset.id)}
                  />
                  <span className={styles.presetLabel}>
                    {preset.label}
                    <span className={styles.presetMeta}>
                      {preset.phases.map((p) => p.abbreviation).join(' → ')}
                      {' · '}
                      {formatTime(
                        preset.phases.reduce(
                          (sum, p) => sum + p.durationSeconds,
                          0,
                        ),
                      )}{' '}
                      total
                    </span>
                  </span>
                </label>
              ))}
              <label className={styles.presetOption}>
                <input
                  type='radio'
                  name='preset'
                  value='custom'
                  checked={isCustom}
                  onChange={() => setSelectedPresetId('custom')}
                />
                <span className={styles.presetLabel}>Custom</span>
              </label>
            </div>
          </div>

          {isCustom && (
            <div className={styles.customEditor}>
              <h3 className={styles.customTitle}>Phases</h3>
              <div className={styles.customGrid}>
                {customPhases.map((phase, i) => (
                  <div key={phase.id} className={styles.customPhaseRow}>
                    <span className={styles.phaseNum}>{i + 1}.</span>
                    <select
                      className={styles.phaseSelect}
                      value={PHASE_TEMPLATES.findIndex(
                        (t) => t.name === phase.name,
                      )}
                      onChange={(e) =>
                        updatePhaseTemplate(i, parseInt(e.target.value))
                      }
                    >
                      {PHASE_TEMPLATES.map((t, ti) => (
                        <option key={ti} value={ti}>
                          {t.abbreviation} — {t.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type='number'
                      min={0}
                      step={0.5}
                      value={phase.durationSeconds / 60}
                      onChange={(e) =>
                        updatePhaseDuration(i, parseFloat(e.target.value) || 0)
                      }
                      className={styles.customInput}
                      title='Duration (minutes)'
                    />
                    <span className={styles.minLabel}>min</span>
                    <button
                      type='button'
                      className={styles.removeBtn}
                      onClick={() => removePhase(i)}
                      aria-label={`Remove phase ${i + 1}`}
                      title='Remove phase'
                    >
                      &times;
                    </button>
                  </div>
                ))}

                <button
                  type='button'
                  className={styles.addBtn}
                  onClick={addPhase}
                >
                  <span className={styles.addIcon}>+</span> Add Phase
                </button>
              </div>

              <div className={styles.customDivider} />

              <div className={styles.customFixed}>
                <div className={styles.customRow}>
                  <span className={styles.customLabel}>
                    Prep Time (per side)
                  </span>
                  <div className={styles.inputWithUnit}>
                    <input
                      type='number'
                      min={0}
                      step={0.5}
                      value={customPrepTime}
                      onChange={(e) =>
                        setCustomPrepTime(parseFloat(e.target.value) || 0)
                      }
                      className={styles.customInput}
                      required
                    />
                    <span className={styles.minLabel}>min</span>
                  </div>
                </div>
                <div className={styles.customRow}>
                  <span className={styles.customLabel}>Warning at</span>
                  <div className={styles.inputWithUnit}>
                    <input
                      type='number'
                      min={0}
                      step={5}
                      value={customWarning}
                      onChange={(e) =>
                        setCustomWarning(parseInt(e.target.value) || 0)
                      }
                      className={styles.customInput}
                      required
                    />
                    <span className={styles.minLabel}>sec</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type='submit'
            className={styles.startButton}
            disabled={isCustom && customPhases.length === 0}
          >
            Start Debate
          </button>
        </form>
      </div>
    </div>
  );
}
