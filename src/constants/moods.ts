import { Mood } from '../types';

export const MOOD_OPTIONS: { key: Mood; label: string; emoji: string }[] = [
  { key: 'stressed',   label: 'Stressed',   emoji: '😰' },
  { key: 'bored',      label: 'Bored',      emoji: '😑' },
  { key: 'after_meal', label: 'After Meal', emoji: '🍽️' },
  { key: 'happy',      label: 'Happy',      emoji: '😊' },
  { key: 'social',     label: 'Social',     emoji: '👥' },
  { key: 'other',      label: 'Other',      emoji: '💭' },
];

export function getMoodOption(key: Mood) {
  return MOOD_OPTIONS.find(m => m.key === key) ?? MOOD_OPTIONS[5];
}
