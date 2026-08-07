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
    h1: ({ children }) => (
      <h1 className="mb-4 mt-2 text-3xl font-bold text-cyan-400">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-3 mt-4 text-2xl font-semibold text-cyan-300">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-2 mt-3 text-xl font-semibold text-cyan-200">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-3 leading-8">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mb-3 list-disc space-y-2 pl-6">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-3 list-decimal space-y-2 pl-6">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li>{children}</li>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-white">
        {children}
      </strong>
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 underline hover:text-cyan-300"
      >
        {children}
      </a>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-slate-600">
          {children}
        </table>
      </div>
    ),

    th: ({ children }) => (
      <th className="border border-slate-600 bg-slate-700 px-3 py-2 text-left">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="border border-slate-600 px-3 py-2">
        {children}
      </td>
    ),

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