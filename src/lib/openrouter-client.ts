/**
 * OpenRouter API Client with Chat Sessions
 * Implementation using OpenRouter API with conversation memory
 */

// System Prompt for chat sessions
const SYSTEM_PROMPT = `
You are a calm AI companion for students.
You must not repeat phrases already used.
You must progress the conversation.
Avoid generic empathy templates.
`;

// Chat Session Manager using OpenRouter API
class OpenRouterClient {
  private apiKey: string;
  private chatSessions: Map<string, any>; // Map<sessionId, conversationHistory>

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.chatSessions = new Map();
  }

  /**
   * Get or create chat session for a sessionId
   */
  private getChatSession(sessionId: string): any {
    if (!this.chatSessions.has(sessionId)) {
