import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[90vh] bg-slate-950 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6">

        <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full">
          🚀 AI Career Advisor
        </span>

        <h1 className="text-6xl font-bold text-white mt-8 leading-tight">
          Find Your
          <span className="text-blue-500"> Dream Career </span>
          with AI
        </h1>

        <p className="text-gray-400 mt-8 text-xl max-w-2xl">
          Discover the perfect career path based on your interests,
          skills, personality and future goals.
        </p>

        <div className="flex gap-5 mt-10">
          <Link
            href="/chat"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-white"
          >
            Start AI Chat
          </Link>

          <button className="border border-gray-700 px-8 py-4 rounded-xl text-white hover:bg-slate-800">
            Learn More
          </button>
        </div>

      </div>
    </section>
  );
}