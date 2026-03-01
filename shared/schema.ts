import { z } from "zod";

export const insertWaitlistSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
});

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistSchema>;

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}
