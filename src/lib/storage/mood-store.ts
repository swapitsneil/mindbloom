interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: string;
  note?: string;
}

interface StreakData {
  count: number;
  lastDate: string; // YYYY-MM-DD
}

const MOOD_KEY = "mindbloom_moods";
const STREAK_KEY = "mindbloom_streak";

export const moodStore = {
  getMoods: (): MoodEntry[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(MOOD_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored) || [];
    } catch {
      return [];
    }
  },

  saveMood: (mood: string, note?: string) => {
    if (typeof window === "undefined") return;
    const today = new Date().toISOString().split("T")[0];
    const moods = moodStore.getMoods();
    
    // Remove existing entry for today
    const filtered = moods.filter(m => m.date !== today);
    
    // Add new entry
    filtered.push({ date: today, mood, note });
    
    localStorage.setItem(MOOD_KEY, JSON.stringify(filtered));
    streakStore.updateStreak();
  },

  getTodayMood: (): string | null => {
    if (typeof window === "undefined") return null;
    const today = new Date().toISOString().split("T")[0];
    const moods = moodStore.getMoods();
    const todayMood = moods.find(m => m.date === today);
    return todayMood ? todayMood.mood : null;
  }
};

export const streakStore = {
  getStreak: (): StreakData => {
    if (typeof window === "undefined") return { count: 0, lastDate: "" };
    const stored = localStorage.getItem(STREAK_KEY);
    if (!stored) return { count: 0, lastDate: "" };
    try {
      return JSON.parse(stored) || { count: 0, lastDate: "" };
    } catch {
      return { count: 0, lastDate: "" };
    }
  },

  updateStreak: () => {
    if (typeof window === "undefined") return;
    const today = new Date().toISOString().split("T")[0];
    const streak = streakStore.getStreak();
    
    if (streak.lastDate === today) {
      return; // Already updated today
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    
    if (streak.lastDate === yesterdayStr) {
      // Consecutive day
      streak.count += 1;
    } else if (streak.lastDate !== today) {
      // New streak
      streak.count = 1;
    }
    
    streak.lastDate = today;
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  },

  getStreakCount: (): number => {
    return streakStore.getStreak().count;
  }
};
