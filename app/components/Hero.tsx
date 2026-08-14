"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">
      <div className="text-center">

        <span
          className="
            inline-block
            bg-blue-600/20
            text-blue-400
            px-4 py-2
            rounded-full
            animate-[fadeUp_0.8s_ease-out_forwards]
            opacity-0
          "
        >
          🚀 AI Career Advisor
        </span>

        <h1
          className="
            text-6xl
            font-bold
            text-white
            mt-8
            leading-tight
            animate-[fadeUp_0.8s_ease-out_0.15s_forwards]
            opacity-0
          "
        >
          Find Your
          <span className="text-blue-500"> Dream Career </span>
          with AI
        </h1>

        <p
          className="
            text-gray-400
            mt-8
            text-xl
            max-w-2xl
            mx-auto
            animate-[fadeUp_0.8s_ease-out_0.3s_forwards]
            opacity-0
          "
        >
          Discover the perfect career path based on your interests,
          skills, personality and future goals.
        </p>

        <div
          className="
            flex
            justify-center
            gap-5
            mt-10
            animate-[fadeUp_0.8s_ease-out_0.45s_forwards]
            opacity-0
          "
        >
          <Link
            href="/chat"
            onClick={() =>
              localStorage.setItem("forceNewChat", "true")
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              px-8 py-4
              rounded-xl
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-lg
              hover:shadow-blue-500/20
            "
          >
            Start AI Chat
          </Link>

          <button
            className="
              border
              border-gray-700
              px-8 py-4
              rounded-xl
              text-white
              hover:bg-slate-800
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}