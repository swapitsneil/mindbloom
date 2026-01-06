# MindBloom - Emotional Support Companion

<div align="center">

Made with ❤️ Swapnil Nicolson Dadel | Hackathon Project

</div>

MindBloom is a compassionate AI-powered emotional support companion designed specifically for students. It provides a safe space to express feelings and offers supportive, non-judgmental conversations.

## 🌟 Features

- **AI-Powered Chat**: Intelligent conversations with emotional support focus
- **Mood Tracking**: Log and track your emotional well-being over time
- **Journal**: Private space for reflection and thoughts
- **Session-Based Memory**: Fresh conversations on each visit for privacy
- **Local Storage**: All data stays on your device

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI**: OpenRouter API with Xiaomi Mimo model
- **Storage**: LocalStorage for client-side data persistence
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenRouter API key

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then add your OpenRouter API key to `.env.local`

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/          # AI chat API route
│   ├── chat/              # Chat interface
│   ├── journal/           # Journal entries
│   ├── mood/              # Mood tracking
│   └── page.tsx           # Home page
├── components/
│   └── shared/            # Reusable UI components
├── lib/
│   ├── hooks/
│   │   └── useChat.ts     # Custom chat hook
│   └── storage/           # LocalStorage managers
├── agents/
│   └── ai-agents.ts       # AI safety & response agents
└── types/
    └── index.ts           # TypeScript definitions
```

## 🔒 Privacy & Security

- **Local Storage Only**: All chat history, mood logs, and journal entries are stored locally in your browser
- **Session-Based**: Backend memory clears on server restart
- **No Medical Advice**: This is emotional support, not therapy
- **Emergency Resources**: Clear disclaimers and crisis helpline information

## ⚠️ Important Disclaimer

**MindBloom is not therapy or a replacement for professional help.** If you are in crisis or danger, please reach out to emergency services or a mental health professional immediately.

## 🎯 Project Goals

This project was built for a hackathon with the following objectives:

- ✅ Create a safe, judgment-free space for emotional expression
- ✅ Implement AI-powered supportive conversations
- ✅ Provide mood tracking and journaling capabilities
- ✅ Ensure complete user privacy through local storage
- ✅ Build with modern, accessible UI/UX

## 🤝 Contributing

This is a hackathon project, but feedback and suggestions are welcome!

---

**Built with love and care for student mental health** 💜
