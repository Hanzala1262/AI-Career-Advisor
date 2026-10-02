"use client";

import { useChatContext } from "@/app/Context/ChatProvider";
import { Conversation } from "@/app/types/chat";
import { MessageSquare, Plus, Trash2 } from "lucide-react";

interface SidebarProps {
  chats: Conversation[];
  currentChat: string;

  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void;
}

export default function Sidebar({
  chats,
  currentChat,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: SidebarProps) {
const { sidebarOpen, setSidebarOpen } = useChatContext();
const handleSelectChat = (id: string) => {
  onSelectChat(id);

  // Close sidebar only on mobile
  if (window.innerWidth < 768) {
    setSidebarOpen(false);
  }
};

const handleNewChat = () => {
  onNewChat();

  // Close sidebar only on mobile
  if (window.innerWidth < 768) {
    setSidebarOpen(false);
  }
};

  return (
    <aside
      className={`
        shrink-0
        overflow-hidden
        border-r border-slate-800
        bg-slate-900
        transition-all
        duration-300
        ${sidebarOpen ? "w-64 md:w-72" : "w-0 border-r-0"}
      `}
    >
      <div className="flex h-full w-64 md:w-72 flex-col">

        {/* New Chat */}
        <div className="p-4">
          <button
           onClick={handleNewChat}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl
              bg-cyan-500
              px-4 py-3
              font-medium
              text-slate-950
              transition
              hover:bg-cyan-400
            "
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 space-y-2 overflow-y-auto px-3">

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`
                group
                flex
                min-w-0
                items-center
                justify-between
                rounded-lg
                px-3
                py-3
                transition
                ${
                  currentChat === chat.id
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }
              `}
            >
              <button
                onClick={() => handleSelectChat(chat.id)}
                className="
                  flex
                  min-w-0
                  flex-1
                  items-center
                  gap-3
                  text-left
                  text-slate-300
                "
              >
                <MessageSquare
                  size={18}
                  className="shrink-0"
                />

                <span className="truncate">
                  {chat.title}
                </span>
              </button>

              {chats.length > 1 && (
                <button
                  onClick={() => onDeleteChat(chat.id)}
                  className="
                    ml-2
                    shrink-0
                    opacity-100
                    transition
                    md:opacity-0
                    md:group-hover:opacity-100
                  "
                >
                  <Trash2
                    size={16}
                    className="text-red-400 hover:text-red-300"
                  />
                </button>
              )}
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 p-4 text-center text-sm text-slate-500">
          CareerAI v1.0
        </div>

      </div>
    </aside>
  );
}