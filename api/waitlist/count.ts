import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPool } from "../_supabase";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const pool = getPool();
      const result = await pool.query("SELECT COUNT(*) as count FROM waitlist_entries");
      return res.status(200).json({ count: parseInt(String(result.rows[0].count), 10) });
    } catch (error) {
      console.error("Waitlist count error:", error);
      return res.status(500).json({ error: "Failed to get waitlist count" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
