import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPool } from "./_supabase";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { email } = req.body;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ error: "Email is required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const pool = getPool();

      const existing = await pool.query(
        "SELECT id, email, created_at FROM waitlist_entries WHERE email = $1",
        [normalizedEmail]
      );

      if (existing.rows.length > 0) {
        return res.status(200).json({
          message: "Already on waitlist",
          entry: {
            id: existing.rows[0].id,
            email: existing.rows[0].email,
            createdAt: existing.rows[0].created_at,
          },
        });
      }

      try {
        const result = await pool.query(
          "INSERT INTO waitlist_entries (email) VALUES ($1) RETURNING id, email, created_at",
          [normalizedEmail]
        );

        return res.status(201).json({
          message: "Successfully added to waitlist",
          entry: {
            id: result.rows[0].id,
            email: result.rows[0].email,
            createdAt: result.rows[0].created_at,
          },
        });
      } catch (insertErr: any) {
        if (insertErr?.code === "23505") {
          return res.status(200).json({ message: "Already on waitlist" });
        }
        throw insertErr;
      }
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
