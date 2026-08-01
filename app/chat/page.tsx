"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useChat } from "@/app/hooks/Usechat";
import { Message } from "@/app/types/chat";

import Sidebar from "@/app/components/chat/Sidebar";
import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import MessageList from "@/app/components/chat/MessageList";

export default function ChatPage() {
  const [userName, setUserName] = useState("User");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  

  const {
    conversations,
    activeConversation,
    activeConversationId,

    newChat,
    selectChat,
    deleteChat,
    renameChat,
    setConversationMessages,
    setConversationLoading,
  } = useChat();

  const messages = activeConversation.messages;

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const name =
        session.user.user_metadata.full_name ||
        session.user.email?.split("@")[0] ||
        "User";

      setUserName(name);

      if (activeConversation.messages.length === 1) {
        setConversationMessages([
          {
            role: "assistant",
            message: `👋 Hi ${name}! I'm CareerAI. Tell me about yourself and I'll help you choose the best career.`,
          },
        ]);
      }
    };

    loadUser();
  }, []);

  const handleSend = async (message: string) => {
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", message },
    ];

    if (activeConversation.title === "New Chat") {
      renameChat(
        activeConversationId,
        message.length > 30 ? message.substring(0, 30) + "..." : message
      );
    }

    setConversationMessages(updatedMessages);

    setConversationLoading(activeConversationId, true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        message,
        history: updatedMessages,
        }),
      });

      const data = await res.json();

      let current = "";

      setConversationMessages([
        ...updatedMessages,
        { role: "assistant", message: "" },
      ]);

      for (const word of data.reply.split(" ")) {
        current += word + " ";
        await new Promise((r) => setTimeout(r, 25));

        setConversationMessages([
          ...updatedMessages,
          { role: "assistant", message: current },
        ]);
      }
    } catch {
      setConversationMessages([
        ...updatedMessages,
        {
          role: "assistant",
          message: "❌ Something went wrong.",
        },
      ]);
    } finally {

      setConversationLoading(activeConversationId, false);
    }
  };

  return (
    <main className="flex h-screen bg-slate-950 text-white">
      <Sidebar
        open={sidebarOpen}
        chats={conversations}
        currentChat={activeConversationId}
        onNewChat={newChat}
        onDeleteChat={deleteChat}
        onSelectChat={selectChat}
      />

      <div className="flex flex-1 flex-col">
         <ChatHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
/>

        <MessageList
          messages={messages}
          loading={activeConversation.loading}
          userName={userName}
        />

        <ChatInput
          onSend={handleSend}
          disabled={activeConversation.loading}
        />
      </div>
    </main>
  );
}
