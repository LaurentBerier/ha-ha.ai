import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
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
      const sql = getDb();

      const existing = await sql`
        SELECT id, email, created_at AS "createdAt"
        FROM waitlist_entries
        WHERE email = ${normalizedEmail}
      `;

      if (existing.length > 0) {
        return res.status(200).json({
          message: "Already on waitlist",
          entry: existing[0],
        });
      }

      const result = await sql`
        INSERT INTO waitlist_entries (id, email, created_at)
        VALUES (gen_random_uuid(), ${normalizedEmail}, NOW())
        RETURNING id, email, created_at AS "createdAt"
      `;

      return res.status(201).json({
        message: "Successfully added to waitlist",
        entry: result[0],
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
