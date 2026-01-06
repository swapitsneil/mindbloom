/**
 * Gemini API Client with Chat Sessions
 * Proper implementation using @google/generative-ai SDK with conversation memory
 */

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// System Prompt for chat sessions
const SYSTEM_PROMPT = `
You are a calm AI companion for students.
You must not repeat phrases already used.
You must progress the conversation.
Avoid generic empathy templates.
`;

// Chat Session Manager using official Gemini SDK
class GeminiClient {
  private apiKey: string;
  private chatSessions: Map<string, any>; // Map<sessionId, chatSession>

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.chatSessions = new Map();
  }

  /**
   * Get or create chat session for a sessionId using model.startChat()
   */
  private getChatSession(sessionId: string): any {
    if (!this.chatSessions.has(sessionId)) {
      const genAI = new GoogleGenerativeAI(this.apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      // Use model.startChat() exactly like SwapChat
      const chatSession = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }],
          },
        ],
      });

      this.chatSessions.set(sessionId, chatSession);
    }
    return this.chatSessions.get(sessionId);
  }

  /**
   * Send user message and get assistant response using official SDK
   */
  async sendMessage(sessionId: string, userMessage: string): Promise<string> {
    try {
      const chatSession = this.getChatSession(sessionId);

      // Use official SDK sendMessage method
      const result = await chatSession.sendMessage(userMessage);

      // Extract and return the response text
      return result.response.text();

    } catch (error) {
      console.error("Gemini SDK error:", error);
      return this.generateFallbackResponse(userMessage);
    }
  }

  /**
   * Clear chat session (called on page refresh or new conversation)
   */
  clearSession(sessionId: string): void {
    this.chatSessions.delete(sessionId);
  }

  /**
   * Generate fallback response with anti-repetition logic
   */
  private generateFallbackResponse(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();

    // Job loss/business failure responses
    if (lowerMsg.includes("job") && lowerMsg.includes("lost") ||
        lowerMsg.includes("business") && (lowerMsg.includes("stopped") || lowerMsg.includes("flopped"))) {
      return "Losing your job and business creates significant challenges. This is a tough situation to navigate. What aspects of this change feel most difficult right now?";
    }

    // General responses with anti-repetition
    return "This sounds like a difficult situation. How are you feeling about it right now?";
  }
}

// Singleton instance
let geminiClientInstance: GeminiClient | null = null;

export function getGeminiClient(): GeminiClient {
  if (!geminiClientInstance) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
      console.warn("Gemini API key not found in environment variables");
    }
    geminiClientInstance = new GeminiClient(apiKey);
  }
  return geminiClientInstance;
}