import crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET must be set");
  return secret;
}

export function createAdminToken(): string {
  const payload = JSON.stringify({
    admin: true,
    exp: Date.now() + TOKEN_EXPIRY_MS,
  });
  const hmac = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  const token = Buffer.from(payload).toString("base64") + "." + hmac;
  return token;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const [payloadB64, hmac] = token.split(".");
    if (!payloadB64 || !hmac) return false;

    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const expectedHmac = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    if (hmac !== expectedHmac) return false;

    const data = JSON.parse(payload);
    if (!data.admin || Date.now() > data.exp) return false;

    return true;
  } catch {
    return false;
  }
}

export function setAdminCookie(res: VercelResponse, token: string) {
  res.setHeader(
    "Set-Cookie",
    `admin_token=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400; Secure`
  );
}

export function clearAdminCookie(res: VercelResponse) {
  res.setHeader(
    "Set-Cookie",
    `admin_token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0; Secure`
  );
}

export function getAdminToken(req: VercelRequest): string | null {
  const cookies = req.headers.cookie || "";
  const match = cookies.match(/admin_token=([^;]+)/);
  return match ? match[1] : null;
}

export function isAdmin(req: VercelRequest): boolean {
  const token = getAdminToken(req);
  if (!token) return false;
  return verifyAdminToken(token);
}
