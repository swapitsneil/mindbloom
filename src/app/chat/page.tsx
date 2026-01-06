"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useChat } from "@/lib/hooks/useChat";

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-purple-600 hover:text-purple-800">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-2xl font-bold text-purple-900">Chat with MindBloom</h2>
      </div>

      {/* Messages Container */}
      <Card className="border-2 border-purple-100">
        <CardContent className="p-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-purple-600 py-12">
              <p className="text-lg mb-2">How are you feeling today?</p>
              <p className="text-sm opacity-75">I am here to listen without judgment.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-purple-200 text-purple-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-purple-200 rounded-lg px-4 py-3 text-purple-900">
                <span className="inline-block animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling right now?"
          className="flex-1 border-2 border-purple-200 focus:border-purple-400"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
