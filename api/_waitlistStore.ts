import { randomUUID } from "crypto";

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
}

const globalState = globalThis as typeof globalThis & {
  __HAHA_WAITLIST__?: WaitlistEntry[];
};

const entries = (globalState.__HAHA_WAITLIST__ ??= []);

export function listEntries(): WaitlistEntry[] {
  return [...entries].reverse();
}

export function findEntryByEmail(email: string): WaitlistEntry | null {
  return entries.find((entry) => entry.email === email) ?? null;
}

export function addEntry(email: string): WaitlistEntry {
  const entry: WaitlistEntry = {
    id: randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };
  entries.push(entry);
  return entry;
}

export function getCount(): number {
  return entries.length;
}
