import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
});

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

// In-memory session store (clears on refresh / restart)
const sessions = new Map<string, Message[]>();

const SYSTEM_PROMPT: Message = {
  role: "system",
  content: `
You are MindBloom, a calm emotional-support companion for students.

Strict response rules:
Use plain text only.
Do not use markdown symbols such as **, *, -, or bullet formatting.
Do not use emojis.
Write in short, gentle paragraphs.
Never repeat exact sentences used earlier in the conversation.
Do not give medical or therapy advice.
Offer simple, practical steps written as normal sentences.
Ask exactly one thoughtful question at the end.

Tone guidelines:
Warm, human, supportive, non-clinical, and reassuring.
`,
};

export async function POST(req: Request) {
  try {
    const { sessionId, message } = await req.json();

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: "Missing sessionId or message" },
        { status: 400 }
      );
    }

    let history = sessions.get(sessionId);

    if (!history) {
      history = [SYSTEM_PROMPT];
      sessions.set(sessionId, history);
    }

    history.push({ role: "user", content: message });

    // Keep only the last 8 messages to maintain context
    history = history.slice(-8);
    sessions.set(sessionId, history);

    const completion = await client.chat.completions.create({
      model: "xiaomi/mimo-v2-flash:free",
      messages: history,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ??
      "I’m here with you. Please tell me a little more about what’s been weighing on you.";

    history.push({ role: "assistant", content: reply });
    sessions.set(sessionId, history);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("OpenRouter error:", err);

    return NextResponse.json(
      {
        error: "AI service temporarily unavailable",
      },
      { status: 503 }
    );
  }
}
