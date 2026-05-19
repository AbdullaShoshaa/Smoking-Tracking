export const DB_NAME = 'smoking.db';

export const CREATE_ENTRIES_TABLE = `
  CREATE TABLE IF NOT EXISTS entries (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    logged_at   TEXT    NOT NULL,
    local_date  TEXT    NOT NULL,
    local_hour  INTEGER NOT NULL,
    mood        TEXT    NOT NULL,
    note        TEXT
  );
`;

export const CREATE_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_entries_local_date ON entries (local_date);
  CREATE INDEX IF NOT EXISTS idx_entries_logged_at  ON entries (logged_at);
`;
