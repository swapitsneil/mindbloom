import { useState, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  // Generate NEW session on every page load (NO persistence)
  useEffect(() => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
  }, []);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: userMessage,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("AI unavailable");
      }

      const data = await response.json();

      const aiMsg: Message = {
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      // IMPORTANT: do NOT inject fake AI replies
      alert("MindBloom is temporarily unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    setSessionId(crypto.randomUUID());
  };

  return {
    messages,
    sendMessage,
    isLoading,
    clearHistory,
  };
}
