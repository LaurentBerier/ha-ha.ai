import type { Express } from "express";
import { type Server } from "http";
import { randomUUID } from "crypto";
import { insertWaitlistSchema } from "@shared/schema";

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

const waitlistEntries: WaitlistEntry[] = [];

function requireAdmin(req: any, res: any, next: any) {
  if (req.session?.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "Invalid password" });
      }
      req.session.isAdmin = true;
      return res.json({ success: true });
    } catch (_error) {
      return res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/waitlist", requireAdmin, async (_req, res) => {
    return res.json({ entries: [...waitlistEntries].reverse() });
  });

  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Invalid email address",
          details: result.error.flatten(),
        });
      }

      const existingEntry = waitlistEntries.find((entry) => entry.email === result.data.email);
      if (existingEntry) {
        return res.status(200).json({
          message: "Already on waitlist",
          entry: existingEntry,
        });
      }

      const entry: WaitlistEntry = {
        id: randomUUID(),
        email: result.data.email,
        createdAt: new Date().toISOString(),
      };

      waitlistEntries.push(entry);

      return res.status(201).json({
        message: "Successfully added to waitlist",
        entry,
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      return res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  app.get("/api/waitlist/count", async (_req, res) => {
    return res.json({ count: waitlistEntries.length });
  });

  return httpServer;
}
