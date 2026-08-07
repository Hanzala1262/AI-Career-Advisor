"use client";
import {deleteChat as deleteChatFromDB,} from "@/lib/chatService";
import { useEffect, useState } from "react";
import { getChats } from "@/lib/chatService";
import { Conversation, Message } from "@/app/types/chat";

export function useChat(userId?: string) {
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

useEffect(() => {
  if (!userId) return;

  const loadChats = async () => {
    try {
      const chats = await getChats(userId);

      if (!chats || chats.length === 0) return;

      const formatted: Conversation[] = chats.map((chat: any) => ({
        id: chat.id,
        title: chat.title,
        createdAt: new Date(chat.created_at),
        loading: false,
        messages: [],
      }));

      setConversations(formatted);


const forceNewChat = localStorage.getItem("forceNewChat");

if (forceNewChat === "true") {
  const newConversation = createConversation();

  setConversations((prev) => [...formatted, newConversation]);
  setActiveConversationId(newConversation.id);

  localStorage.setItem("lastChatId", newConversation.id);


  // localStorage.removeItem("forceNewChat");

  return;
}



const tempChat = localStorage.getItem("tempChat");

if (tempChat) {
  const parsedChat: Conversation = JSON.parse(tempChat);

  setConversations([...formatted, parsedChat]);

  setActiveConversationId(parsedChat.id);

  localStorage.setItem("lastChatId", parsedChat.id);

  return;
}

const lastChatId = localStorage.getItem("lastChatId");

const chatExists = formatted.some(
  (chat) => chat.id === lastChatId
);

if (chatExists && lastChatId) {
  setActiveConversationId(lastChatId);
} else {
  setActiveConversationId(formatted[0].id);
}


    } catch (error) {
      console.error("Load Chats Error:", error);
    }
  };

  loadChats();
}, [userId]);


  // -----------------------------
  // Create New Chat
  // -----------------------------
const newChat = () => {
  const chat = createConversation();

  setConversations((prev) => [...prev, chat]);
  setActiveConversationId(chat.id);
  localStorage.setItem("lastChatId", chat.id);
  localStorage.setItem("tempChat",JSON.stringify(chat)
);
};
  // -----------------------------
  // Switch Chat
  // -----------------------------

  const selectChat = (id: string) => {
  setActiveConversationId(id);
  localStorage.setItem("lastChatId", id);
};

  // -----------------------------
  // Delete Chat
  // -----------------------------

  const deleteChat = async (id: string) => {
  try {
    if (!id.startsWith("temp-")) {
  await deleteChatFromDB(id);
}
    setConversations((prev) => {
      if (prev.length === 1) return prev;

      const updated = prev.filter((c) => c.id !== id);

      if (activeConversationId === id && updated.length > 0) {
        setActiveConversationId(updated[0].id);
      }

      return updated;
    });
  } catch (error) {
    console.error("Delete Chat Error:", error);
  }
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



 const replaceConversationId = (
  oldId: string,
  newId: string
) => {
  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === oldId
        ? {
            ...chat,
            id: newId,
          }
        : chat
    )
  );

  setActiveConversationId(newId);
};



  // -----------------------------
  // Replace Messages
  // -----------------------------

 const setConversationMessages = (
  chatId: string,
  messages: Message[]
) => {
  setConversations((prev) =>
    prev.map((chat) =>
      chat.id === chatId
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
    replaceConversationId,

    setConversationMessages,
    setConversationLoading,
  };
}