import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const { neon } = await import("@neondatabase/serverless");
      const url = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
      if (!url) return res.status(500).json({ error: "Database not configured" });
      const sql = neon(url);
      const result = await sql`SELECT COUNT(*) as count FROM waitlist_entries`;
      return res.status(200).json({ count: parseInt(result[0].count as string) });
    } catch (error) {
      console.error("Waitlist count error:", error);
      return res.status(500).json({ error: "Failed to get waitlist count" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
