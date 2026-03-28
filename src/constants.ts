import type { Phase, TimingPreset } from './types';

export interface PhaseTemplate {
  name: string;
  abbreviation: string;
  speaker: Phase['speaker'];
  description: string;
  defaultDurationSeconds: number;
}

export const PHASE_TEMPLATES: PhaseTemplate[] = [
  {
    name: 'Affirmative Constructive',
    abbreviation: 'AC',
    speaker: 'affirmative',
    description: 'Affirmative presents their case',
    defaultDurationSeconds: 6 * 60,
  },
  {
    name: 'Negative Constructive',
    abbreviation: 'NC',
    speaker: 'negative',
    description: 'Negative presents their case',
    defaultDurationSeconds: 7 * 60,
  },
  {
    name: 'Cross-Examination',
    abbreviation: 'CX',
    speaker: 'both',
    description: 'Cross-examination period',
    defaultDurationSeconds: 3 * 60,
  },
  {
    name: 'Affirmative Rebuttal',
    abbreviation: 'AR',
    speaker: 'affirmative',
    description: 'Affirmative rebuts Negative arguments',
    defaultDurationSeconds: 4 * 60,
  },
  {
    name: 'Negative Rebuttal',
    abbreviation: 'NR',
    speaker: 'negative',
    description: 'Negative rebuts Affirmative arguments',
    defaultDurationSeconds: 6 * 60,
  },
  {
    name: 'Affirmative Rejoinder',
    abbreviation: 'ARj',
    speaker: 'affirmative',
    description: 'Affirmative final response',
    defaultDurationSeconds: 3 * 60,
  },
  {
    name: 'Negative Rejoinder',
    abbreviation: 'NRj',
    speaker: 'negative',
    description: 'Negative final response',
    defaultDurationSeconds: 3 * 60,
  },
  {
    name: 'First Affirmative Rebuttal',
    abbreviation: '1AR',
    speaker: 'affirmative',
    description: 'Affirmative rebuts Negative arguments',
    defaultDurationSeconds: 4 * 60,
  },
  {
    name: 'Second Affirmative Rebuttal',
    abbreviation: '2AR',
    speaker: 'affirmative',
    description: 'Affirmative final rebuttal',
    defaultDurationSeconds: 3 * 60,
  },
];

const STANDARD_PHASES: Phase[] = [
  { id: 1, name: 'Affirmative Constructive', abbreviation: 'AC', speaker: 'affirmative', description: 'Affirmative presents their case', durationSeconds: 6 * 60 },
  { id: 2, name: 'Cross-Examination', abbreviation: 'CX', speaker: 'both', description: 'Negative questions, Affirmative answers', durationSeconds: 3 * 60 },
  { id: 3, name: 'Negative Constructive', abbreviation: 'NC', speaker: 'negative', description: 'Negative presents their case', durationSeconds: 7 * 60 },
  { id: 4, name: 'Cross-Examination', abbreviation: 'CX', speaker: 'both', description: 'Affirmative questions, Negative answers', durationSeconds: 3 * 60 },
  { id: 5, name: 'First Affirmative Rebuttal', abbreviation: '1AR', speaker: 'affirmative', description: 'Affirmative rebuts Negative arguments', durationSeconds: 4 * 60 },
  { id: 6, name: 'Negative Rebuttal', abbreviation: 'NR', speaker: 'negative', description: 'Negative rebuts and summarizes', durationSeconds: 6 * 60 },
  { id: 7, name: 'Second Affirmative Rebuttal', abbreviation: '2AR', speaker: 'affirmative', description: 'Affirmative final rebuttal', durationSeconds: 3 * 60 },
];

const CLUB_PHASES: Phase[] = [
  { id: 1, name: 'Affirmative Constructive', abbreviation: 'AC', speaker: 'affirmative', description: 'Affirmative presents their case', durationSeconds: 6 * 60 },
  { id: 2, name: 'Negative Rebuttal', abbreviation: 'NR', speaker: 'negative', description: 'Negative rebuts Affirmative arguments', durationSeconds: 6 * 60 },
  { id: 3, name: 'Negative Constructive', abbreviation: 'NC', speaker: 'negative', description: 'Negative presents their case', durationSeconds: 7 * 60 },
  { id: 4, name: 'Affirmative Rebuttal', abbreviation: 'AR', speaker: 'affirmative', description: 'Affirmative rebuts Negative arguments', durationSeconds: 4 * 60 },
  { id: 5, name: 'Affirmative Rejoinder', abbreviation: 'ARj', speaker: 'affirmative', description: 'Affirmative final response', durationSeconds: 3 * 60 },
  { id: 6, name: 'Negative Rejoinder', abbreviation: 'NRj', speaker: 'negative', description: 'Negative final response', durationSeconds: 3 * 60 },
];

const SHORT_PHASES: Phase[] = [
  { id: 1, name: 'Affirmative Constructive', abbreviation: 'AC', speaker: 'affirmative', description: 'Affirmative presents their case', durationSeconds: 2 * 60 },
  { id: 2, name: 'Negative Rebuttal', abbreviation: 'NR', speaker: 'negative', description: 'Negative rebuts Affirmative arguments', durationSeconds: 2 * 60 },
  { id: 3, name: 'Negative Constructive', abbreviation: 'NC', speaker: 'negative', description: 'Negative presents their case', durationSeconds: 2 * 60 + 30 },
  { id: 4, name: 'Affirmative Rebuttal', abbreviation: 'AR', speaker: 'affirmative', description: 'Affirmative rebuts Negative arguments', durationSeconds: 1 * 60 + 30 },
  { id: 5, name: 'Affirmative Rejoinder', abbreviation: 'ARj', speaker: 'affirmative', description: 'Affirmative final response', durationSeconds: 1 * 60 + 30 },
  { id: 6, name: 'Negative Rejoinder', abbreviation: 'NRj', speaker: 'negative', description: 'Negative final response', durationSeconds: 1 * 60 + 30 },
];

export const STANDARD_LD: TimingPreset = {
  id: 'standard',
  label: 'Standard LD',
  phases: STANDARD_PHASES,
  prepTimeSeconds: 4 * 60,
  warningThresholdSeconds: 60,
};

export const CLUB_LD: TimingPreset = {
  id: 'club',
  label: 'Club Format',
  phases: CLUB_PHASES,
  prepTimeSeconds: 4 * 60,
  warningThresholdSeconds: 60,
};

export const SHORT_LD: TimingPreset = {
  id: 'short',
  label: 'Short / Impromptu',
  phases: SHORT_PHASES,
  prepTimeSeconds: 2 * 60,
  warningThresholdSeconds: 30,
};

export const PRESETS: TimingPreset[] = [CLUB_LD, STANDARD_LD, SHORT_LD];

export const SIDE_COLORS = {
  affirmative: '#2563eb',
  negative: '#dc2626',
} as const;
