import pg from "pg";

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL or NEON_DATABASE_URL must be set");
    }
    pool = new pg.Pool({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}
