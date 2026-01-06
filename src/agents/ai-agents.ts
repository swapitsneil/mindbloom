// Enhanced Conversation Agent with Memory and Anti-Repetition
// Tracks conversation state and provides progressive, non-repetitive responses

interface Message {
  role: "user" | "ai";
  content: string;
}

interface ConversationContext {
  messages: Message[];
  usedResponses: Set<string>;
  lastGroundingOffered: boolean;
  lastFollowUpQuestion: string | null;
}

interface MoodResult {
  tag: string;
  acknowledgment: string;
}

interface AIResponse {
  response: string;
  followUpQuestion?: string;
}

// Conversation State Management
let conversationContext: ConversationContext = {
  messages: [],
  usedResponses: new Set(),
  lastGroundingOffered: false,
  lastFollowUpQuestion: null
};

// Enhanced Mood Assessment with Context Awareness
export const moodAssessmentAgent = {
  assess: (message: string, context: Message[] = []): MoodResult => {
    const lowerMsg = message.toLowerCase();

    // Context-specific assessment for job loss
    if (lowerMsg.match(/\b(job|work|employment|career)\b/) &&
        (lowerMsg.match(/\b(lost|loss|fired|laid off|unemployed)\b/) ||
         lowerMsg.match(/\b(no longer|don't have|let go)\b/))) {
      return {
        tag: "job_loss",
        acknowledgment: "Losing a job is a major life transition that affects many aspects of life."
      };
    }

    // Context-specific assessment for business/financial stress
    if (lowerMsg.match(/\b(business|money|finance|financial|loss|lost|invest|investment|debt)\b/) ||
        lowerMsg.match(/\b(\d{4,})\b/)) {
      return {
        tag: "financial_stress",
        acknowledgment: "That sounds like a significant financial pressure. It's understandable to feel this way."
      };
    }

    // Stress indicators
    if (lowerMsg.match(/\b(stress|stressed|overwhelmed|pressure|deadline|exam|test)\b/)) {
      return {
        tag: "stress",
        acknowledgment: "It sounds like you're carrying a lot right now. That's completely valid."
      };
    }

    // Anxiety indicators
    if (lowerMsg.match(/\b(anxious|anxiety|worry|worried|nervous|panic|scared)\b/)) {
      return {
        tag: "anxiety",
        acknowledgment: "Feeling anxious can be really tough. I'm here to listen."
      };
    }

    // Sadness indicators
    if (lowerMsg.match(/\b(sad|lonely|depressed|down|blue|empty|crying)\b/)) {
      return {
        tag: "sadness",
        acknowledgment: "I'm sorry you're feeling this way. Your feelings matter."
      };
    }

    // Anger/frustration indicators
    if (lowerMsg.match(/\b(angry|mad|frustrated|annoyed|irritated)\b/)) {
      return {
        tag: "frustration",
        acknowledgment: "It's okay to feel frustrated. Let's work through this together."
      };
    }

    // Default neutral
    return {
      tag: "neutral",
      acknowledgment: "Thank you for sharing. I'm here to support you."
    };
  }
};

// Enhanced Coping Suggestion with Anti-Repetition
export const copingSuggestionAgent = {
  suggest: (mood: MoodResult, context: ConversationContext): AIResponse => {
    // Progressive support flow based on conversation stage
    const conversationStage = Math.min(3, context.messages.filter(m => m.role === 'user').length);

      // Context-specific responses
      const getContextSpecificResponse = (): AIResponse => {
        const lowerMsg = context.messages[context.messages.length - 1]?.content.toLowerCase() || "";

        // Job loss context
        if (mood.tag === "job_loss") {
          const stageResponses = [
            {
              response: "Losing a job can feel like losing part of your identity and routine. It's completely normal to feel this way.",
              followUp: "What aspects of your previous job will you miss the most?"
            },
            {
              response: "This transition is challenging, but it also opens up new possibilities. Your skills and experience are still valuable.",
              followUp: "What's one strength or skill you developed in your previous role that you're proud of?"
            },
            {
              response: "Job loss affects so many areas of life - finances, self-esteem, daily structure. It's okay to grieve this loss.",
              followUp: "What's one small thing you can do today to take care of yourself during this transition?"
            }
          ];
          return stageResponses[conversationStage % stageResponses.length];
        }

        // Financial stress context
        if (mood.tag === "financial_stress") {
          const stageResponses = [
            {
              response: "Losing money, especially as a student, can feel overwhelming. The amount might seem small to others, but it represents your hard work and hopes.",
              followUp: "What was this money meant for? Understanding that might help process the loss."
            },
            {
              response: "It's completely valid to feel this way. Financial setbacks can shake our confidence and make us question our decisions.",
              followUp: "Would it help to talk about what this experience has taught you, even if it's painful?"
            },
            {
              response: "This situation is tough, but it doesn't define you. Many successful people have faced similar setbacks and learned from them.",
              followUp: "What's one small step you could take to move forward, even if it's just acknowledging how you feel?"
            }
          ];
          return stageResponses[conversationStage % stageResponses.length];
        }

      // General mood responses with anti-repetition
      const responseOptions = {
        stress: [
          {
            response: "This pressure you're feeling is real and valid. It's okay to acknowledge that it's heavy right now.",
            followUp: "What's one thing that usually helps you feel a little lighter, even if just for a moment?"
          },
          {
            response: "When stress builds up, it can feel like too much to handle. That's a normal reaction to overwhelming situations.",
            followUp: "Would it help to break down what's stressing you into smaller, more manageable pieces?"
          },
          {
            response: "Your body and mind are responding to real pressure. This isn't weakness - it's a sign you care deeply.",
            followUp: "What's something kind you could do for yourself right now?"
          }
        ],
        anxiety: [
          {
            response: "Anxiety can make everything feel more intense. What you're experiencing is your system trying to protect you.",
            followUp: "Where do you feel this anxiety most in your body? Sometimes naming it can help."
          },
          {
            response: "These worried thoughts are understandable, but they don't have to control you. You're stronger than your anxiety.",
            followUp: "What's one small, concrete thing you can focus on right now to ground yourself?"
          },
          {
            response: "It's tough when anxious thoughts spiral. Remember, feelings are temporary, even when they feel overwhelming.",
            followUp: "What's something in your environment right now that feels safe or comforting?"
          }
        ],
        sadness: [
          {
            response: "Sadness has a way of making everything feel heavier. It's okay to sit with these feelings for a while.",
            followUp: "What's one small thing that usually brings you comfort, even if it's just for a few minutes?"
          },
          {
            response: "When we feel down, it can be hard to see beyond the sadness. That doesn't mean it will last forever.",
            followUp: "Would it help to write down what you're feeling, just to get it out of your head?"
          },
          {
            response: "This sadness is part of your journey, not the whole story. Be gentle with yourself right now.",
            followUp: "What's one thing you've overcome in the past that shows your strength?"
          }
        ],
        frustration: [
          {
            response: "Frustration is often a sign that something matters to you. It's okay to feel this strongly.",
            followUp: "What's the core issue that's frustrating you the most?"
          },
          {
            response: "When we're frustrated, it can help to channel that energy into understanding what we really want.",
            followUp: "What's one small change that might make this situation feel better?"
          },
          {
            response: "This frustration won't last forever. It's a signal, not a life sentence.",
            followUp: "What's something you can appreciate about yourself, even in this frustrating moment?"
          }
        ],
        neutral: [
          {
            response: "I'm here to listen. You can share whatever's on your mind.",
            followUp: "Is there something specific you'd like to talk about today?"
          },
          {
            response: "This is a safe space. What you share here matters.",
            followUp: "What's been on your mind lately?"
          },
          {
            response: "I'm listening. Take your time.",
            followUp: "Would you like to share more about how you're feeling?"
          }
        ]
      };

      // Get all possible responses for this mood
      const allOptions = responseOptions[mood.tag as keyof typeof responseOptions];

      // Find a response that hasn't been used yet
      for (const option of allOptions) {
        if (!context.usedResponses.has(option.response)) {
          return option;
        }
      }

      // If all have been used, return the first one (will be handled by rephrasing)
      return allOptions[0];
    };

    return getContextSpecificResponse();
  }
};

// Conversation Memory and Response Generation
export const conversationAgent = {
  generateResponse: (userMessage: string): AIResponse => {
    // Update conversation context
    conversationContext.messages.push({ role: "user", content: userMessage });

    // Assess mood with context
    const mood = moodAssessmentAgent.assess(userMessage, conversationContext.messages);

    // Check for crisis/safety issues
    const safetyCheck = safetyEscalationAgent.checkRisk(userMessage);

    if (safetyCheck.riskLevel === "high") {
      return {
        response: safetyEscalationAgent.generateResponse()
      };
    }

    // Generate response with anti-repetition
    let responseData = copingSuggestionAgent.suggest(mood, conversationContext);

    // Anti-repetition: Ensure we don't repeat the same phrasing
    if (conversationContext.usedResponses.has(responseData.response)) {
      // Rephrase the response naturally
      responseData = rephraseResponse(responseData, mood);
    }

    // Track used responses to prevent repetition
    conversationContext.usedResponses.add(responseData.response);

    // Track grounding exercises to avoid overuse
    if (responseData.response.toLowerCase().includes("grounding")) {
      conversationContext.lastGroundingOffered = true;
    }

    // Limit conversation history to last 5 messages to maintain focus
    if (conversationContext.messages.length > 10) {
      conversationContext.messages = conversationContext.messages.slice(-5);
    }

    return responseData;
  },

  resetConversation: () => {
    conversationContext = {
      messages: [],
      usedResponses: new Set(),
      lastGroundingOffered: false,
      lastFollowUpQuestion: null
    };
  }
};

// Response Rephrasing for Anti-Repetition
const rephraseResponse = (original: AIResponse, mood: MoodResult): AIResponse => {
  // Create a comprehensive set of alternative phrasings
  const alternativePhrases = {
    // Job loss specific
    "lost job": [
      "Losing a job can be a significant blow to both finances and self-esteem.",
      "Job loss affects so many aspects of life - it's understandable to feel this way.",
      "This transition is tough, but it doesn't define your worth or capabilities."
    ],
    // General acknowledgment alternatives
    "I hear you": [
      "That sounds really challenging",
      "This must be difficult for you",
      "I can imagine how hard this feels",
      "That's a tough situation to be in"
    ],
    // Supportive alternatives
    "I'm here to support you": [
      "You're not alone in this",
      "I'm here with you through this",
      "You have support right now",
      "Let's work through this together"
    ],
    // Grounding exercise alternatives
    "grounding exercise": [
      "Let's try a brief mindfulness exercise together",
      "Would you like to do a short sensory check-in?",
      "We could try a quick body scan exercise",
      "How about a brief breathing exercise?"
    ]
  };

  // Check for specific patterns and replace them
  let rephrased = original.response;

  // Replace common repetitive phrases
  if (rephrased.includes("I hear you")) {
    const alternatives = alternativePhrases["I hear you"];
    rephrased = rephrased.replace("I hear you", alternatives[Math.floor(Math.random() * alternatives.length)]);
  }

  if (rephrased.includes("I'm here to support you")) {
    const alternatives = alternativePhrases["I'm here to support you"];
    rephrased = rephrased.replace("I'm here to support you", alternatives[Math.floor(Math.random() * alternatives.length)]);
  }

  if (rephrased.includes("grounding exercise")) {
    const alternatives = alternativePhrases["grounding exercise"];
    rephrased = rephrased.replace("grounding exercise", alternatives[Math.floor(Math.random() * alternatives.length)]);
  }

  // Job loss specific handling
  if (original.response.includes("lost job") || original.response.includes("job loss")) {
    const jobLossResponses = alternativePhrases["lost job"];
    return {
      response: jobLossResponses[Math.floor(Math.random() * jobLossResponses.length)],
      followUp: "What was most meaningful to you about your previous work?"
    };
  }

  // If we still have the original response, try to modify it
  if (rephrased === original.response) {
    // Add some variation
    const variations = [
      `Understandably, ${original.response}`,
      `It makes sense that ${original.response.toLowerCase()}`,
      `I can see how ${original.response.toLowerCase()}`,
      original.response + " This is a normal reaction to a difficult situation."
    ];
    rephrased = variations[Math.floor(Math.random() * variations.length)];
  }

  return {
    response: rephrased,
    followUp: original.followUpQuestion
  };
};

// Safety & Escalation Agent
// Detects crisis language and provides appropriate responses

export const safetyEscalationAgent = {
  checkRisk: (message: string): { riskLevel: "low" | "high" } => {
    const lowerMsg = message.toLowerCase();

    // Crisis indicators
    const crisisKeywords = [
      "want to die", "kill myself", "end it all", "don't want to live",
      "suicide", "hurt myself", "self harm", "cut myself",
      "can't do this anymore", "give up", "nothing matters"
    ];

    const hasCrisis = crisisKeywords.some(keyword => lowerMsg.includes(keyword));

    return {
      riskLevel: hasCrisis ? "high" : "low"
    };
  },

  generateResponse: (): string => {
    return "I hear that you are going through something really difficult right now. Your life matters, and there are people who want to support you.\n\n" +
           "Please consider reaching out to:\n" +
           "• A crisis helpline (they are available 24/7)\n" +
           "• A trusted friend, family member, or counselor\n" +
           "• Emergency services (911) if you are in immediate danger\n\n" +
           "You do not have to go through this alone. Would you like me to share some specific resources?";
  }
};