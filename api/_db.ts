import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error("NEON_DATABASE_URL or DATABASE_URL must be set");
  }
  return neon(url);
}
