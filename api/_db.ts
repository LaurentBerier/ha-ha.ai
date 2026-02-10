import pg from "pg";

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool {
  if (!pool) {
    const url = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (!url) {
      throw new Error("NEON_DATABASE_URL or DATABASE_URL must be set");
    }
    pool = new Pool({
      connectionString: url,
      max: 1,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}
