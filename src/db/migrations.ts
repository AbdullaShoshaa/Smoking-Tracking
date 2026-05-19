import { SQLiteDatabase } from 'expo-sqlite';
import { CREATE_ENTRIES_TABLE, CREATE_INDEXES } from './schema';

export async function runMigrations(db: SQLiteDatabase): Promise<void> {
  db.runSync(CREATE_ENTRIES_TABLE);
  db.runSync(CREATE_INDEXES);
}
