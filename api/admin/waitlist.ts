import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdmin } from "../_auth";
import { getPool } from "../_db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    if (!isAdmin(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const pool = getPool();
      const result = await pool.query(
        'SELECT id, email, created_at AS "createdAt" FROM waitlist_entries ORDER BY created_at DESC'
      );
      return res.json({ entries: result.rows });
    } catch (error) {
      console.error("Admin waitlist error:", error);
      return res.status(500).json({ error: "Failed to get waitlist" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
