interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

interface ChatHistory {
  messages: ChatMessage[];
}

const CHAT_KEY = "mindbloom_chat";

export const chatStore = {
  getHistory: (): ChatMessage[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(CHAT_KEY);
    if (!stored) return [];
    try {
      const data: ChatHistory = JSON.parse(stored);
      return data.messages || [];
    } catch {
      return [];
    }
  },

  saveMessage: (message: ChatMessage) => {
    if (typeof window === "undefined") return;
    const history = chatStore.getHistory();
    history.push(message);
    localStorage.setItem(CHAT_KEY, JSON.stringify({ messages: history }));
  },

  clearHistory: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CHAT_KEY);
  },

  restoreHistory: (): ChatMessage[] => {
    return chatStore.getHistory();
  }
};
