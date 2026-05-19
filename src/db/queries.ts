import { SQLiteDatabase } from 'expo-sqlite';
import { format } from 'date-fns';
import { Entry, DailyStat, HourlyBucket, MoodCount, Mood } from '../types';

export function insertEntry(
  db: SQLiteDatabase,
  mood: Mood,
  note: string | null
): number {
  const now = new Date();
  const logged_at = now.toISOString();
  const local_date = format(now, 'yyyy-MM-dd');
  const local_hour = now.getHours();

  const result = db.runSync(
    `INSERT INTO entries (logged_at, local_date, local_hour, mood, note)
     VALUES (?, ?, ?, ?, ?)`,
    logged_at, local_date, local_hour, mood, note ?? null
  );
  return result.lastInsertRowId;
}

export function getTodayCount(db: SQLiteDatabase, today: string): number {
  const row = db.getFirstSync<{ n: number }>(
    `SELECT COUNT(*) AS n FROM entries WHERE local_date = ?`,
    today
  );
  return row?.n ?? 0;
}

export function getRecentEntries(db: SQLiteDatabase, limit = 5): Entry[] {
  return db.getAllSync<Entry>(
    `SELECT * FROM entries ORDER BY logged_at DESC LIMIT ?`,
    limit
  );
}

export function getHourlyBuckets(
  db: SQLiteDatabase,
  date: string
): HourlyBucket[] {
  return db.getAllSync<HourlyBucket>(
    `SELECT local_hour AS hour, COUNT(*) AS count
     FROM entries
     WHERE local_date = ?
     GROUP BY local_hour
     ORDER BY local_hour`,
    date
  );
}

export function getDayMoodBreakdown(
  db: SQLiteDatabase,
  date: string
): MoodCount[] {
  return db.getAllSync<MoodCount>(
    `SELECT mood, COUNT(*) AS count
     FROM entries
     WHERE local_date = ?
     GROUP BY mood
     ORDER BY count DESC`,
    date
  );
}

export function getWeeklyDailyCounts(
  db: SQLiteDatabase,
  startDate: string,
  endDate: string
): DailyStat[] {
  return db.getAllSync<DailyStat>(
    `SELECT local_date, COUNT(*) AS count
     FROM entries
     WHERE local_date BETWEEN ? AND ?
     GROUP BY local_date
     ORDER BY local_date`,
    startDate, endDate
  );
}

export function getWeekMoodBreakdown(
  db: SQLiteDatabase,
  startDate: string,
  endDate: string
): MoodCount[] {
  return db.getAllSync<MoodCount>(
    `SELECT mood, COUNT(*) AS count
     FROM entries
     WHERE local_date BETWEEN ? AND ?
     GROUP BY mood
     ORDER BY count DESC`,
    startDate, endDate
  );
}

export function getMonthlyDailyCounts(
  db: SQLiteDatabase,
  yearMonth: string
): DailyStat[] {
  return db.getAllSync<DailyStat>(
    `SELECT local_date, COUNT(*) AS count
     FROM entries
     WHERE local_date LIKE ?
     GROUP BY local_date
     ORDER BY local_date`,
    `${yearMonth}-%`
  );
}

export function getMonthMoodBreakdown(
  db: SQLiteDatabase,
  yearMonth: string
): MoodCount[] {
  return db.getAllSync<MoodCount>(
    `SELECT mood, COUNT(*) AS count
     FROM entries
     WHERE local_date LIKE ?
     GROUP BY mood
     ORDER BY count DESC`,
    `${yearMonth}-%`
  );
}

export function getAllEntries(db: SQLiteDatabase): Entry[] {
  return db.getAllSync<Entry>(
    `SELECT * FROM entries ORDER BY logged_at DESC`
  );
}

export function deleteEntry(db: SQLiteDatabase, id: number): void {
  db.runSync(`DELETE FROM entries WHERE id = ?`, id);
}
