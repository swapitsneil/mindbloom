// Type definitions for MindBloom

export interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: string;
  note?: string;
}

export interface StreakData {
  count: number;
  lastDate: string; // YYYY-MM-DD
}

export interface MoodResult {
  tag: string;
  acknowledgment: string;
}

export interface SafetyCheckResult {
  riskLevel: "low" | "high";
}

export interface JournalEntry {
  date: string;
  content: string;
  mood?: string;
}
