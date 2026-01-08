# 🌱 MindBloom - Your Calm AI Companion for Students

MindBloom is a gentle, student-focused AI companion designed to help users feel heard, grounded, and supported during stressful moments exams, job loss, burnout, or loneliness.

It is **not therapy**.  
It is a **safe first step** toward mental clarity and self-reflection.

---

## 🧠 Problem

Students today face:

- Academic pressure and deadlines  
- Career uncertainty and job loss  
- Financial stress  
- Emotional burnout  
- Limited access to counsellors (cost, wait time, hesitation)

Most students don’t need therapy immediately -
they need **someone to listen, calm them down, and guide them gently**.

---

## 🌼 Solution - MindBloom

MindBloom provides:

- 🤍 A calm AI chat companion available 24/7  
- 🧘 Short, grounding coping steps (breathing, reflection, journaling)  
- 📓 A private journaling space tied to calendar dates  
- 😊 Daily mood tracking  
- 🔒 100% private - everything stays on the user’s device  
- 🚨 Gentle safety escalation when distress is detected  

No pressure.  
No diagnosis.  
No judgment.

---

## ✨ Key Features

### 💬 AI Chat Companion
- Supportive, human-like responses
- Progressive conversation (no repetitive replies)
- Session-based memory (resets on refresh)
- Powered by **free OpenRouter AI model**

### 📓 Smart Journaling
- Write entries for **any past date**
- Calendar highlights saved days
- Edit and revisit old thoughts easily
- Perfect for self-reflection and emotional clarity

### 😊 Mood Tracking
- Track how you feel daily
- Mood is linked with journal entries
- Helps recognize emotional patterns over time

### 🛡️ Safety-First Design
- Not therapy, not medical advice
- Encourages real-world support when needed
- Calm, student-friendly tone throughout

---

## 🖼️ Screenshots



<img width="2844" height="1512" alt="Image" src="https://github.com/user-attachments/assets/a5447019-f172-46d8-a39a-215131df831e" />

<img width="2854" height="1520" alt="Image" src="https://github.com/user-attachments/assets/fa9fd467-b74d-43dd-85d3-f0b0de2bb857" />

<img width="2850" height="1428" alt="Image" src="https://github.com/user-attachments/assets/25a35663-0140-45b0-8429-d79e2394793d" />

<img width="2828" height="1478" alt="Image" src="https://github.com/user-attachments/assets/7e14a397-d81a-4e9e-98ec-1f1a047c4b73" />

<img width="2798" height="1468" alt="Image" src="https://github.com/user-attachments/assets/b1329456-b477-46b6-86b5-f2927fde66cb" />

---
## 🔗‍️ Deployment

vercel - https://mindbloom-snowy.vercel.app/

---


## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### AI & Backend
- OpenRouter API
- model: xiaomi/mimo-v2-flash:free
- Server-side Node.js runtime
- In-memory session handling (no database)

### Storage
- Browser LocalStorage only
- No backend database
- No authentication

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenRouter API key or any API key

### Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then add your API key (gemini, openai or any) to `.env.local`

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
## 🙌 Author
Built with care by Swapnil Nicolson Dadel for students who just need a moment of peace 🌱

**Built with love and care for student mental health** 💜
