"use client";

import { useState } from "react";
import { Conversation, Message } from "@/app/types/chat";

export function useChat() {
  const createWelcomeMessage = (): Message => ({
    role: "assistant",
    message:
      "👋 Hi! I'm CareerAI. Tell me about yourself and I'll help you choose the best career.",
  });

  const createConversation = (): Conversation => ({
    id: crypto.randomUUID(),
    title: "New Chat",
    createdAt: new Date(),
    loading: false,
    messages: [createWelcomeMessage()],
  });

  const [conversations, setConversations] = useState<Conversation[]>([
    createConversation(),
  ]);

  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0].id
  );

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ??
    conversations[0];

  // -----------------------------
  // Create New Chat
  // -----------------------------

  const newChat = () => {
    const chat = createConversation();

    setConversations((prev) => [...prev, chat]);
    setActiveConversationId(chat.id);
  };

  // -----------------------------
  // Switch Chat
  // -----------------------------

  const selectChat = (id: string) => {
    setActiveConversationId(id);
  };

  // -----------------------------
  // Delete Chat
  // -----------------------------

  const deleteChat = (id: string) => {
    setConversations((prev) => {
      if (prev.length === 1) return prev;

      const updated = prev.filter((c) => c.id !== id);

      if (activeConversationId === id) {
        setActiveConversationId(updated[0].id);
      }

      return updated;
    });
  };

  // -----------------------------
  // Rename Chat
  // -----------------------------

  const renameChat = (id: string, title: string) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              title,
            }
          : chat
      )
    );
  };

  // -----------------------------
  // Replace Messages
  // -----------------------------

  const setConversationMessages = (messages: Message[]) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeConversationId
          ? {
              ...chat,
              messages,
            }
          : chat
      )
    );
  };

  // -----------------------------
  // Loading
  // -----------------------------

  const setConversationLoading = (
    id: string,
    loading: boolean
  ) => {
    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              loading,
            }
          : chat
      )
    );
  };

  return {
    conversations,
    activeConversation,
    activeConversationId,

    newChat,
    selectChat,
    deleteChat,
    renameChat,

    setConversationMessages,
    setConversationLoading,
  };
}