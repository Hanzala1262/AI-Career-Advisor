"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import Avatar from "./Avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatBubbleProps {
  role: "user" | "assistant";
  message: string;
  name?: string;
}

export default function ChatBubble({
  role,
  message,
  name,
}: ChatBubbleProps) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={`flex w-full items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <Avatar role="assistant" />}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md transition-all ${
          isUser
            ? "bg-violet-600 text-white rounded-br-md"
            : "rounded-bl-md border border-slate-700 bg-slate-800 text-slate-100"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }: any) {
              const match = /language-(\w+)/.exec(className || "");

              if (match) {
                const code = String(children).replace(/\n$/, "");

                return (
                  <div className="relative">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded bg-slate-700 px-2 py-1 text-xs hover:bg-slate-600"
                    >
                      <Copy size={14} />
                      {copied ? "Copied" : "Copy"}
                    </button>

                    <SyntaxHighlighter
                      language={match[1]}
                      style={oneDark}
                      PreTag="div"
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code className="rounded bg-slate-900 px-1 py-0.5">
                  {children}
                </code>
              );
            },
          }}
        >
          {message}
        </ReactMarkdown>
      </div>

      {isUser && <Avatar role="user" name={name} />}
    </div>
  );
}