// src/agents/ai-agents.ts
// Lightweight safety + fallback logic
// Main intelligence now lives in /api/chat (OpenRouter)

type RiskLevel = "low" | "high";

interface SafetyResult {
  riskLevel: RiskLevel;
}


/* 
   SAFETY ESCALATION AGENT
*/

export const safetyEscalationAgent = {
  checkRisk(message: string): SafetyResult {
    const text = message.toLowerCase();

    const crisisKeywords = [
      "suicide",
      "kill myself",
      "end my life",
      "self harm",
      "cut myself",
      "want to die",
      "no reason to live",
      "give up completely",
    ];

    for (const keyword of crisisKeywords) {
      if (text.includes(keyword)) {
        return { riskLevel: "high" };
      }
    }

    return { riskLevel: "low" };
  },

  generateResponse(): string {
    return (
      "I’m really sorry you’re feeling this much pain. Your life matters. " +
      "If you can, please consider reaching out to someone you trust right now, " +
      "or a local crisis helpline. You don’t have to go through this alone."
    );
  },
};

/* 
   OPTIONAL LOCAL FALLBACK (USED ONLY IF API FAILS)
 */

const fallbackResponses = [
  "That sounds really heavy. You’ve been carrying a lot, and it makes sense to feel this way. What’s been weighing on you the most?",
  "I’m really glad you shared this. Even when things feel overwhelming, talking about them can help a little. What part of this feels hardest right now?",
  "This situation sounds exhausting emotionally and mentally. You’re not weak for feeling this way. What do you feel you need most right now?",
];

/**
 * Simple non-repeating fallback generator
 * (Used only when API errors out)
 */
export const fallbackAgent = (() => {
  let index = 0;

  return {
    next(): string {
      const response = fallbackResponses[index % fallbackResponses.length];
      index++;
      return response;
    },
    reset() {
      index = 0;
    },
  };
})();



export const conversationAgent = {
  resetConversation() {
    fallbackAgent.reset();
  },
};
