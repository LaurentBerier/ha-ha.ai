import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac, timingSafeEqual } from "crypto";
import { listEntries } from "../_waitlistStore";

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET must be set");
  }
  return secret;
}

function verifyAdminToken(token: string): boolean {
  try {
    const dotIndex = token.indexOf(".");
    if (dotIndex === -1) {
      return false;
    }

    const payloadB64 = token.slice(0, dotIndex);
    const hmac = token.slice(dotIndex + 1);
    if (!payloadB64 || !hmac) {
      return false;
    }

    const payload = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const expectedHmac = createHmac("sha256", getSecret()).update(payload).digest("hex");
    if (!timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
      return false;
    }

    const data = JSON.parse(payload);
    if (!data.admin || Date.now() > data.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

function isAdmin(req: VercelRequest): boolean {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/admin_token=([^;]+)/);
  const token = match ? match[1] : null;
  if (!token) {
    return false;
  }
  return verifyAdminToken(token);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    if (!isAdmin(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.json({ entries: listEntries() });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
