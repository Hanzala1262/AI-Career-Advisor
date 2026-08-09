"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { renameChat as renameChatInDB } from "@/lib/chatService";
import { createChat,saveMessage,getMessages,} from "@/lib/chatService";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useChat } from "@/app/hooks/Usechat";
import { Message } from "@/app/types/chat";

import Sidebar from "@/app/components/chat/Sidebar";
import ChatHeader from "@/app/components/chat/ChatHeader";
import ChatInput from "@/app/components/chat/ChatInput";
import MessageList from "@/app/components/chat/MessageList";

export default function ChatPage() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  
  

  const {
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
  } = useChat(userId);
  

  const messages = activeConversation.messages;

useEffect(() => {
  const loadMessages = async () => {
   if (!activeConversationId) return;

if (activeConversationId.startsWith("temp-")) {
  setConversationMessages(activeConversationId, [
    {
      role: "assistant",
      message: `👋 Hi ${userName}! I'm CareerAI. Tell me about yourself and I'll help you choose the best career.`,
    },
  ]);

  return;
}

    try {
      const dbMessages = await getMessages(activeConversationId);

    if (dbMessages.length === 0) {
  if (activeConversation.messages.length > 0) {
    return;
  }

  setConversationMessages(activeConversationId, [
    {
      role: "assistant",
      message: `👋 Hi ${userName}! I'm CareerAI. Tell me about yourself and I'll help you choose the best career.`,
    },
  ]);

  return;
}

      setConversationMessages(
  activeConversationId,
  dbMessages.map((msg: any) => ({
    role: msg.role,
    message: msg.message,
  }))
);
    } catch (error) {
      console.error("Load Messages Error:", error);
    }
  };

  loadMessages();
}, [activeConversationId, userName]);



  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const name =
        session.user.user_metadata.full_name ||
        session.user.email?.split("@")[0] ||
        "User";

      setUserName(name);
      setUserId(session.user.id);

      if (activeConversation.messages.length === 1) {
       setConversationMessages(activeConversationId, [
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

setConversationMessages(activeConversationId, updatedMessages);
const oldChatId = activeConversationId;

let chatId = activeConversationId;

if (
  activeConversation.title === "New Chat" &&
  messages.length === 1 &&
  messages[0].role === "assistant"
) {
  const dbChat = await createChat(userId);

  chatId = dbChat.id;

  replaceConversationId(oldChatId, chatId);

  // Update localStorage with the real DB chat id
  localStorage.setItem("lastChatId", chatId);
  localStorage.removeItem("tempChat");
  localStorage.removeItem("forceNewChat");
}




   if (activeConversation.title === "New Chat") {
  const title =
    message.length > 30
      ? message.substring(0, 30) + "..."
      : message;

  renameChat(chatId, title);
  selectChat(chatId);
await renameChatInDB(chatId, title);
}

   
    if (chatId !== activeConversationId) {
  selectChat(chatId);
}

await saveMessage(
  chatId,
  "user",
  message
);

    setConversationLoading(chatId, true);

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
    await saveMessage(
  chatId,
  "assistant",
  data.reply
);

      let current = "";

     setConversationMessages(chatId, [
  ...updatedMessages,
  { role: "assistant", message: "" },
]);

      for (const word of data.reply.split(" ")) {
        current += word + " ";
        await new Promise((r) => setTimeout(r, 25));

       setConversationMessages(chatId, [...updatedMessages,
        { role: "assistant", message: current },
         ]);
  }
    } catch {
     setConversationMessages(chatId, [
  ...updatedMessages,
  {
    role: "assistant",
    message: "❌ Something went wrong.",
  },
]);
    } finally {

      setConversationLoading(chatId, false);
    }
  };

  return (
    <main className="flex h-screen bg-slate-950 text-white">
      

    <Sidebar
  chats={conversations}
  currentChat={activeConversationId}
  onNewChat={newChat}
  onDeleteChat={deleteChat}
  onSelectChat={selectChat}
/>
   <div className="flex flex-1 flex-col">
<ChatHeader />

       {userName && (
      <MessageList
      messages={messages}
      loading={activeConversation.loading}
       userName={userName}
      />
)}

        <ChatInput
          onSend={handleSend}
          disabled={activeConversation.loading}
        />
        </div>
    </main>
  );
}
