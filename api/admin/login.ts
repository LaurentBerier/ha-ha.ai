import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createAdminToken, setAdminCookie } from "../_auth";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const { password } = req.body;

      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = createAdminToken();
      setAdminCookie(res, token);

      return res.json({ success: true });
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ error: "Login failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
