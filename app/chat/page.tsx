"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [userName, setUserName] = useState("User");

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const name =
          session.user.user_metadata.full_name ||
          session.user.email?.split("@")[0] ||
          "User";

        setUserName(name);

        setMessages([
          {
            role: "assistant",
            content: `👋 Hi ${name}! I'm CareerAI. Tell me about yourself and I'll help you choose the best career.`,
          },
        ]);
      } else {
        setMessages([
          {
            role: "assistant",
            content:
              "👋 Hi! I'm CareerAI. Tell me about yourself and I'll help you choose the best career.",
          },
        ]);
      }
    };

    getUser();
  }, []);






  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  // User message show karo
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: userMessage,
    },
  ]);

  setInput("");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await res.json();

    // AI reply show karo
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "❌ Something went wrong.",
      },
    ]);
  }
};








  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 p-4 text-xl font-bold">
        🤖 CareerAI Assistant
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-xl rounded-xl p-4 ${
              message.role === "assistant"
                ? "bg-slate-800"
                : "bg-blue-600 ml-auto"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message CareerAI, ${userName}...`}
          className="flex-1 rounded-lg bg-slate-800 px-4 py-3 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </main>
  );
}