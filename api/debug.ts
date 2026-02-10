import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { neon } = await import("@neondatabase/serverless");
    const url = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (!url) {
      return res.status(500).json({ error: "No database URL configured", envKeys: Object.keys(process.env).filter(k => k.includes("DATABASE") || k.includes("NEON")) });
    }
    const sql = neon(url);
    const result = await sql`SELECT COUNT(*) as count FROM waitlist_entries`;
    return res.status(200).json({ count: parseInt(result[0].count as string), dbOk: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, stack: error.stack?.split("\n").slice(0, 5) });
  }
}
