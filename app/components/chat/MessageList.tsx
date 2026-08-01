"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import LoadingDots from "./LoadingDots";

export interface Message {
  role: "user" | "assistant";
  message: string;
}

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  userName?: string;
}

export default function MessageList({
  messages,
  loading = false,
  userName,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Check if user is already near the bottom
    const isNearBottom =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      120;

    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            role={msg.role}
            message={msg.message}
            name={userName}
          />
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <LoadingDots />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}