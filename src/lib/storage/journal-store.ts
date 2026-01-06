interface JournalEntry {
  content: string;
  mood?: string;
}

const STORAGE_KEY = "mindbloom_journal_entries";

// Single source of truth for date keys (LOCAL date)
const getLocalDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const journalStore = {
  saveEntry(content: string, mood?: string, date = new Date()) {
    const dateKey = getLocalDateKey(date);
    const entries = this.getAllEntries();

    entries[dateKey] = {
      content,
      mood,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  },

  getTodayEntry() {
    const dateKey = getLocalDateKey(new Date());
    const entries = this.getAllEntries();
    return entries[dateKey] || null;
  },

  getEntryByDate(dateKey: string) {
    const entries = this.getAllEntries();
    return entries[dateKey] || null;
  },

  getAllDates(): string[] {
    return Object.keys(this.getAllEntries());
  },

  getAllEntries(): Record<string, JournalEntry> {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
