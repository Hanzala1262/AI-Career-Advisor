"use client";

import { Menu } from "lucide-react";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatHeader({
  sidebarOpen,
  setSidebarOpen,
}: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 hover:bg-slate-800 transition"
        >
          <Menu size={22} />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold">
          AI
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">
            CareerAI
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Online
          </div>
        </div>
      </div>
    </header>
  );
}