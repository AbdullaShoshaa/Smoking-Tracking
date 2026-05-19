export type Mood =
  | 'stressed'
  | 'bored'
  | 'after_meal'
  | 'happy'
  | 'social'
  | 'other';

export interface Entry {
  id: number;
  logged_at: string;
  local_date: string;
  local_hour: number;
  mood: Mood;
  note: string | null;
}

export interface DailyStat {
  local_date: string;
  count: number;
}

export interface HourlyBucket {
  hour: number;
  count: number;
}

export interface MoodCount {
  mood: Mood;
  count: number;
}
