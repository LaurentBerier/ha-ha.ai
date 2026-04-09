import pg from "pg";

const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL or NEON_DATABASE_URL must be set");
}

const pool = new pg.Pool({
  connectionString: databaseUrl,
});

export async function getWaitlistEntries() {
  const result = await pool.query(
    "SELECT id, email, created_at FROM waitlist_entries ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function getWaitlistEntryByEmail(email: string) {
  const result = await pool.query(
    "SELECT id, email, created_at FROM waitlist_entries WHERE email = $1",
    [email]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function insertWaitlistEntry(email: string) {
  const result = await pool.query(
    "INSERT INTO waitlist_entries (email) VALUES ($1) RETURNING id, email, created_at",
    [email]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function getWaitlistCount() {
  const result = await pool.query("SELECT COUNT(*) as count FROM waitlist_entries");
  return parseInt(String(result.rows[0].count), 10);
}
