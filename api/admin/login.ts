import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac } from "crypto";

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET must be set");
  return secret;
}

function createAdminToken(): string {
  const payload = JSON.stringify({ admin: true, exp: Date.now() + TOKEN_EXPIRY_MS });
  const hmac = createHmac("sha256", getSecret()).update(payload).digest("hex");
  const payloadEncoded = Buffer.from(payload).toString("base64url");
  return payloadEncoded + "." + hmac;
}

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
      const secure = isProduction ? "; Secure" : "";
      res.setHeader(
        "Set-Cookie",
        `admin_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400${secure}`
      );

      return res.json({ success: true });
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ error: "Login failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
